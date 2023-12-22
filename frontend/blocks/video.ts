import type { SvelteComponent } from "svelte"
import PrivacyOverlaySvelte from "../components/PrivacyOverlay.svelte"

declare global {
  interface Window { CookieConsent: any; }
}

export default class Videos {
  constructor() {
    document.querySelectorAll('[data-block-type="video"]').forEach(el => {
      new Video(el as HTMLElement);
    });
  }
}

class Video {
  element: HTMLElement
  iframe: HTMLIFrameElement | null
  figure: HTMLElement | null
  provider: string = ""
  src: string = ""
  overlayElement: SvelteComponent | null = null
  video: HTMLVideoElement | null

  constructor(element: HTMLElement) {
    this.element = element
    this.iframe = element.querySelector('iframe')
    this.video = element.querySelector('video')
    this.figure = element.querySelector('figure')
    this.src = this.iframe?.dataset?.src ?? "";
    if (this.video && this.video.autoplay) {
      this.tryAutoplay()
    } else {
      this.init();
    }
  }

  private tryAutoplay() {
    if (!this.video) return
    let playAttempt = setInterval(() => {
      this.video?.play()
        .then(() => {
          clearInterval(playAttempt);
        })
        .catch((error) => {
          console.log("Unable to play the video, User has not interacted yet.");
        });
    }, 3000);
  }
  private setProvider() {
    this.provider = this.src?.includes('vimeo') ? 'Vimeo' : 'Youtube'
  }

  private getVideoId() {
    const id = this.src?.match(/[\dA-z]*$/)
    if (!id) throw new Error('Video id not found.');
    return id[0];
  }

  private async init() {
    if (!this.iframe) return
    this.setProvider()
    if (this.checkConsentGiven()) {
      this.allowPlayback();
    } else {
      this.setOverlay()
    }
  }

  private checkConsentGiven() {
    return this.provider && window.CookieConsent?.getUserConsent()?.includes(this.provider?.toLowerCase());
  }

  private async getVideoPoster(): Promise<string> {
    if (this.provider == 'Vimeo') {
      try {
        const response = await fetch(`https://vimeo.com/api/v2/video/${this.getVideoId()}.json`);
        const result: any = await response.json()
        if (result) {
          return result[0]?.thumbnail_large;
        }
      } catch (error) {
        throw new Error("Fetch of vimeo thumbnail failed");
      }
    }
    else if (this.provider == 'Youtube') {
      return `https://img.youtube.com/vi/${this.getVideoId()}/maxresdefault.jpg`
    }

    return "";
  }

  private allowPlayback() {
    this.overlayElement?.$destroy()
    if (this.iframe) {
      this.iframe.src = this.src;
    }
  }

  private async setOverlay() {
    if (!this.element || !this.figure) return;
    this.overlayElement = new PrivacyOverlaySvelte({
      target: this.element,
      props: {
        poster: await this.getVideoPoster(),
        provider: this.provider,
        allowPlayback: () => this.allowPlayback(),
        message: this.figure?.dataset.message ?? "",
        buttonText: this.figure?.dataset.buttonText ?? ""
      }
    })
  }

}

new Videos();
