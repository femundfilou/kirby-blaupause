import DebugService from "./DebugService"

/**
 * Manages split text animations
 * @remarks Works with elements having data-animation="split-text" attribute
 */
export default class SplitWords {
	private elements: NodeListOf<HTMLElement>

	/**
	 * @param customSelector - Optional custom selector to override default
	 */
	constructor(customSelector?: string) {
		const selector = customSelector || '[data-animation-prepare="split-words"]'
		this.elements = document.querySelectorAll(selector)
		this.init()
	}

	/**
	 * Initializes the split text animation for all matching elements
	 */
	private init(): void {
		for (const element of this.elements) {
			this.splitElement(element)
		}
		DebugService.log(`Split text animation initialized for ${this.elements.length} elements`)
	}

	/**
	 * Splits the text of a single element
	 * @param element - The element to apply split text animation to
	 */
	private splitElement(element: HTMLElement): void {
		const originalText = element.textContent || ""
		const words = originalText.trim().split(/\s+/)
		const animationDelay = Number.parseFloat(element.getAttribute("data-delay") || "0.1")

		element.innerHTML = ""
		element.setAttribute("aria-label", originalText)

		words.forEach((word, index) => {
			const span = document.createElement("span")
			span.textContent = word
			span.style.setProperty("--delay", `${index * animationDelay}s`)
			element.appendChild(span)

			// Add a space after each word, except the last one
			if (index < words.length - 1) {
				element.appendChild(document.createTextNode(" "))
			}
		})

		DebugService.log("Split text prepared for element", element)
	}
}
