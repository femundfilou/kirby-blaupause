import DebugService from "../services/DebugService"

class PrivacyVideo extends HTMLElement {
	private iframe: HTMLIFrameElement | null = null
	private video: HTMLVideoElement | null = null
	private provider = ""
	private src = ""
	private poster: string | null = null
	private message: string | null = null
	private buttonText: string | null = null

	/**
	 * Called when the element is added to the DOM
	 */
	connectedCallback(): void {
		this.init()
	}

	/**
	 * Initialize the component
	 */
	private async init(): Promise<void> {
		this.iframe = this.querySelector("iframe")
		this.video = this.querySelector("video")
		this.src = this.iframe?.dataset?.src ?? ""

		// Get optional attributes
		this.poster = this.getAttribute("poster")
		this.message = this.getAttribute("message")
		this.buttonText = this.getAttribute("button-text")

		if (this.video?.autoplay) {
			this.tryAutoplay()
		} else {
			this.setProvider()
			if (this.checkConsentGiven()) {
				this.allowPlayback()
			} else {
				await this.setOverlay()
			}
		}
	}

	/**
	 * Try to autoplay the video
	 */
	private tryAutoplay(): void {
		if (!this.video) return
		const playAttempt = setInterval(() => {
			this.video
				?.play()
				.then(() => {
					clearInterval(playAttempt)
				})
				.catch((error) => {
					DebugService.log("Unable to play the video, User has not interacted yet.")
				})
		}, 3000)
	}

	/**
	 * Set the video provider
	 */
	private setProvider(): void {
		this.provider = this.src?.includes("vimeo") ? "Vimeo" : "Youtube"
	}

	/**
	 * Get the video ID from the source URL
	 */
	private getVideoId(): string {
		const id = this.src?.match(/[-_\dA-Za-z]{11}(?=(&|\?|$))/)
		if (!id) throw new Error("Video id not found.")
		return id[0]
	}

	/**
	 * Transform YouTube URL to YouTube-nocookie embed URL
	 */
	private transformYouTubeUrl(): void {
		if (this.provider === "Youtube") {
			const videoId = this.getVideoId()
			this.src = `https://www.youtube-nocookie.com/embed/${videoId}`
		}
	}

	/**
	 * Check if consent has been given for the provider
	 */
	private checkConsentGiven(): boolean {
		// @ts-expect-error
		return this.provider && window.CookieConsent?.getUserConsent()?.includes(this.provider?.toLowerCase())
	}

	/**
	 * Get the video poster image
	 */
	private async getVideoPoster(): Promise<string> {
		if (this.poster) return this.poster

		if (this.provider === "Vimeo") {
			try {
				const response = await fetch(`https://vimeo.com/api/v2/video/${this.getVideoId()}.json`)
				const result = await response.json()
				if (result) {
					// @ts-expect-error
					return result[0]?.thumbnail_large
				}
			} catch (error) {
				throw new Error("Fetch of vimeo thumbnail failed")
			}
		} else if (this.provider === "Youtube") {
			return `https://img.youtube.com/vi/${this.getVideoId()}/maxresdefault.jpg`
		}
		return ""
	}

	/**
	 * Set up the privacy overlay
	 */
	private async setOverlay(): Promise<void> {
		this.poster = await this.getVideoPoster()
		if (!this.message) {
			this.message =
				"This video is hosted by {provider}. By playing this video you accept the privacy policy of {provider}."
		}
		if (!this.buttonText) {
			this.buttonText = "Allow playback"
		}
		this.render()
		this.setupEventListeners()
	}

	/**
	 * Render the privacy overlay
	 */
	private render(): void {
		this.innerHTML = `
      <div class="privacy-overlay">
        <div class="privacy-overlay__background">
          ${this.poster ? `<img src="${this.poster}" alt="${this.provider}">` : ""}
        </div>
        <div class="privacy-overlay__content">
          <div class="privacy-overlay__content__inner">
            <p class="is-size-6-touch">
              ${this.message?.replace("{provider}", this.provider || "") || ""}
            </p>
            <button class="button mt-6">
              ${this.buttonText || ""}
            </button>
          </div>
        </div>
      </div>
    `
	}

	/**
	 * Set up event listeners for the component
	 */
	private setupEventListeners(): void {
		const button = this.querySelector("button")
		button?.addEventListener("click", this.allowPlayback.bind(this))
	}

	/**
	 * Allow video playback
	 */
	private allowPlayback(): void {
		DebugService.log("Playback allowed")
		this.transformYouTubeUrl()
		if (this.iframe) {
			this.iframe.src = this.src
		}
		this.innerHTML = ""
		this.appendChild(this.iframe || this.video || document.createElement("div"))
	}
}

customElements.define("privacy-video", PrivacyVideo)
