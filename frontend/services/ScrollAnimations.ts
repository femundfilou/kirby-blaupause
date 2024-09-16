import DebugService from "./DebugService"

/**
 * Manages scroll-based animations for elements
 * @remarks Uses IntersectionObserver for performance reasons
 */
export default class ScrollAnimations {
	private static instance: ScrollAnimations | null
	private observer: IntersectionObserver
	private animatedElements: Set<Element>

	private constructor() {
		this.animatedElements = new Set()
		this.observer = new IntersectionObserver(this.handleIntersection, {
			rootMargin: "0px 0px -10% 0px",
			threshold: 0.1
		})

		this.init()
	}

	/**
	 * Gets the singleton instance of ScrollAnimations
	 */
	public static getInstance(): ScrollAnimations {
		if (!ScrollAnimations.instance) {
			ScrollAnimations.instance = new ScrollAnimations()
		}
		return ScrollAnimations.instance
	}

	/**
	 * Initializes animations for elements with data-animation attribute
	 */
	public init(): void {
		const elements = document.querySelectorAll("[data-animation]")
		for (const element of elements) {
			this.addElement(element)
		}
	}

	/**
	 * Adds a new element to the observer
	 * @param element - The element to add
	 */
	public addElement(element: Element): void {
		DebugService.log("Adding element to ScrollAnimations", element)
		element.classList.add("ready")
		this.observer.observe(element)
		this.animatedElements.add(element)
	}

	/**
	 * Adds multiple elements to the observer
	 * @param elements - The elements to add
	 */
	public addElements(elements: Element[] | NodeListOf<Element>): void {
		for (const element of elements) {
			this.addElement(element)
		}
	}

	/**
	 * Cleans up animations and resets the instance
	 */
	public destroy(): void {
		this.observer.disconnect()
		for (const element of this.animatedElements) {
			element.classList.remove("animated", "ready")
		}
		this.animatedElements.clear()
		ScrollAnimations.instance = null
	}

	/**
	 * Reinitializes the ScrollAnimations instance
	 * @remarks Useful for reinitializing animations after DOM changes
	 */
	public static reinitialize(): void {
		if (ScrollAnimations.instance) {
			ScrollAnimations.instance.destroy()
		}
		ScrollAnimations.instance = new ScrollAnimations()
		DebugService.log("ScrollAnimations reinitialized")
	}

	/**
	 * Handles intersection events for observed elements
	 */
	private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
		for (const { isIntersecting, target } of entries) {
			if (isIntersecting) {
				const element = target as HTMLElement
				const delay = Number.parseFloat(element.dataset.delay || "0") * 1000
				setTimeout(() => element.classList.add("animated"), delay)
				this.observer.unobserve(element)
				this.animatedElements.delete(element)
				DebugService.log("Element animated", element)
			}
		}
	}
}
