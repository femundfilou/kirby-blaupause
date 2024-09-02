import Swup, { type Visit } from 'swup';
import DebugService from './DebugService';

/**
 * Options for configuring the SwupManager
 */
interface SwupManagerOptions {
  containers: string[];
  plugins?: any[];
  debug?: boolean;
}

/**
 * Manages the lifecycle and behavior of scripts in a Swup-enabled application
 * @remarks Uses DebugService for logging
 */
class SwupManager {
  public swup: Swup;
  private scriptInstances: any[] = [];
  private addedScripts: HTMLScriptElement[] = [];

  /**
   * Creates an instance of SwupManager
   * @param options - Configuration options for SwupManager
   */
  constructor(options: SwupManagerOptions) {
    this.swup = new Swup({
      containers: options.containers,
      plugins: options.plugins || []
    });

    // @ts-ignore
    window.Swup = this.swup;

    if (options.debug) {
      DebugService.enableDebug();
    }

    this.initializeHooks();
  }

  /**
   * Initializes Swup hooks for managing page views and content replacement
   */
  private initializeHooks(): void {
    this.swup.hooks.on('page:view', this.handlePageView.bind(this));
    this.swup.hooks.on('content:replace', this.handleContentReplace.bind(this));
  }

  /**
   * Handles the page view event
   * @param visit - The visit object from Swup
   */
  private handlePageView(visit: Visit): void {
    DebugService.log('Swup: Page view hook triggered.');
    if (visit.to.html) {
      this.handleScripts(visit.to.html);
    }
  }

  /**
   * Handles the content replace event
   */
  private handleContentReplace(): void {
    DebugService.log('Swup: Content replace hook triggered.');
    this.destroyScriptInstances();
    this.removeAddedScripts();
  }

  /**
   * Handles the loading and execution of scripts for new content
   * @param htmlString - The HTML content as a string
   */
  private async handleScripts(htmlString: string): Promise<void> {
    DebugService.log('Swup: Handling scripts for new content.');
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const scripts = doc.querySelectorAll<HTMLScriptElement>('script[data-swup-script]');

    for (const script of scripts) {
      const src = script.getAttribute('src');
      if (src) {
        await this.loadScript(script);
      } else {
        this.executeInlineScript(script);
      }
    }
  }

  /**
   * Loads a script based on its type
   * @param script - The script element to load
   */
  private async loadScript(script: HTMLScriptElement): Promise<void> {
    const src = script.getAttribute('src');
    if (!src) return;

    const isModule = script.type === 'module';
    DebugService.log(`Loading ${isModule ? 'module' : 'traditional'} script: ${src}`);

    if (isModule) {
      await this.loadModuleScript(src);
    } else {
      this.loadTraditionalScript(script);
    }
  }

  /**
   * Dynamically loads a module script and creates an instance of its default export
   * @param src - The source URL of the module script
   */
  private async loadModuleScript(src: string): Promise<void> {
    try {
      const Module = await import(/* @vite-ignore */src);
      if (Module?.default) {
        const instance = new Module.default();
        if (instance?.destroy) {
          this.scriptInstances.push(instance);
          DebugService.log(`Module script loaded and instance created: ${src}`);
        }
      }
    } catch (error) {
      DebugService.error(`Error loading module script: ${src}`, error);
    }
  }

  /**
   * Creates and appends a traditional script element to the DOM
   * @param originalScript - The original script element to replicate
   */
  private loadTraditionalScript(originalScript: HTMLScriptElement): void {
    const script = document.createElement('script');
    Array.from(originalScript.attributes).forEach(attr => script.setAttribute(attr.name, attr.value));
    document.body.appendChild(script);
    this.addedScripts.push(script);
    DebugService.log(`Traditional script added to the DOM: ${originalScript.src}`);
  }

  /**
   * Executes an inline script
   * @param originalScript - The original inline script element
   */
  private executeInlineScript(originalScript: HTMLScriptElement): void {
    DebugService.log('Swup: Executing inline script.');
    const script = document.createElement('script');
    script.textContent = originalScript.textContent;
    document.head.appendChild(script).parentNode?.removeChild(script);
  }

  /**
   * Destroys all script instances that were created by the manager
   */
  private destroyScriptInstances(): void {
    DebugService.log('Swup: Destroying script instances.');
    this.scriptInstances.forEach(instance => instance.destroy?.());
    this.scriptInstances = [];
  }

  /**
   * Removes all scripts added by the manager from the DOM
   */
  private removeAddedScripts(): void {
    DebugService.log('Swup: Removing added scripts from the DOM.');
    this.addedScripts.forEach(script => script.remove());
    this.addedScripts = [];
  }
}

export default SwupManager;
