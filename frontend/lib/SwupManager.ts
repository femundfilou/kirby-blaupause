import Swup from 'swup';

/**
 * Options for configuring the SwupManager.
 */
interface SwupManagerOptions {
  containers: string[];
  plugins?: any[];
  debug?: boolean; // Flag for enabling debug mode
}

/**
 * Manages the lifecycle and behavior of scripts in a Swup-enabled application.
 */
class SwupManager {
  private swup: Swup;
  private scriptInstances: any[] = [];
  private addedScripts: HTMLScriptElement[] = [];
  private debug: boolean;

  /**
   * Creates an instance of SwupManager.
   * @param options - Configuration options for SwupManager.
   */
  constructor(options: SwupManagerOptions) {
    this.swup = new Swup({
      containers: options.containers,
      plugins: options.plugins || []
    });

    // @ts-ignore
    window.Swup = this.swup;

    this.debug = options.debug || false;
    this.initializeHooks();
  }

  /**
   * Logs debug messages to the console if debug mode is enabled.
   * @param message - The message to log.
   */
  private logDebug(message: string): void {
    if (this.debug) {
      console.log(`[SwupManager Debug] ${message}`);
    }
  }

  /**
   * Initializes Swup hooks for managing page views and content replacement.
   */
  private initializeHooks() {
    this.swup.hooks.on('page:view', (visit) => {
      this.logDebug('Page view hook triggered.');
      if (visit.to.html) {
        this.handleScripts(visit.to.html);
      }
    });

    this.swup.hooks.on('content:replace', () => {
      this.logDebug('Content replace hook triggered.');
      this.destroyScriptInstances();
      this.removeAddedScripts();
    });
  }

  /**
   * Handles the loading and execution of scripts for new content.
   * @param htmlString - The HTML content as a string.
   */
  private async handleScripts(htmlString: string): Promise<void> {
    this.logDebug('Handling scripts for new content.');
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const scripts: NodeListOf<HTMLScriptElement> = doc.querySelectorAll('script[data-swup-script]');

    for (let originalScript of scripts) {
      const src = originalScript.getAttribute('src');
      if (src) {
        const isModule = originalScript.type === 'module';
        if (isModule) {
          this.logDebug(`Loading module script: ${src}`);
          await this.loadModuleScript(src);
        } else {
          this.logDebug(`Loading traditional script: ${src}`);
          this.loadTraditionalScript(originalScript);
        }

      } else {
        // inline script
        this.logDebug('Executing inline script.');
        const script = document.createElement('script');
        script.type = originalScript.type || 'text/javascript';
        // Copy any other attributes you care about here (like nonce or integrity)
        if (originalScript.textContent) {
          script.textContent = originalScript.textContent;
        }
        document.head.appendChild(script).parentNode?.removeChild(script);
      }
    }
  }

  /**
   * Dynamically loads a module script and creates an instance of its default export.
   * @param src - The source URL of the module script.
   */
  private async loadModuleScript(src: string): Promise<void> {
    try {
      const Module = await import(/* @vite-ignore */src);
      if (Module && Module.default) {
        const instance = new Module.default();
        if (instance && typeof instance.destroy === 'function') {
          this.scriptInstances.push(instance);
          this.logDebug(`Module script loaded and instance created: ${src}`);
        }
      }
    } catch (error) {
      console.error('Error loading module:', error);
      this.logDebug(`Error loading module script: ${src}`);
    }
  }

  /**
   * Creates and appends a traditional script element to the DOM.
   * @param originalScript - The original script element to replicate.
   */
  private loadTraditionalScript(originalScript: HTMLScriptElement): void {
    const script = document.createElement('script');
    Array.from(originalScript.attributes).forEach(attr => {
      script.setAttribute(attr.name, attr.value);
    });
    document.body.appendChild(script);
    this.addedScripts.push(script);
    this.logDebug(`Traditional script added to the DOM: ${originalScript.src}`);
  }

  /**
   * Destroys all script instances that were created by the manager.
   */
  private destroyScriptInstances() {
    this.logDebug('Destroying script instances.');
    this.scriptInstances.forEach(instance => {
      if (typeof instance.destroy === 'function') {
        instance.destroy();
        this.logDebug('Script instance destroyed.');
      }
    });
    this.scriptInstances = [];
  }

  /**
   * Removes all scripts added by the manager from the DOM.
   */
  private removeAddedScripts() {
    this.logDebug('Removing added scripts from the DOM.');
    this.addedScripts.forEach(script => script.remove());
    this.addedScripts = [];
  }
}

export default SwupManager;
