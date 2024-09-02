/**
 * Manages scroll-based animations for elements
 * @remarks Uses IntersectionObserver for performance reasons
 */
export default class ScrollAnimations {
  private static instance: ScrollAnimations | null;
  private observer: IntersectionObserver;
  private animatedElements: Set<Element>;

  private constructor() {
    this.animatedElements = new Set();
    this.observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });

    this.init();
  }

  /**
   * Gets the singleton instance of ScrollAnimations
   */
  public static getInstance(): ScrollAnimations {
    return this.instance ??= new ScrollAnimations();
  }

  /**
   * Initializes animations for elements with data-animation attribute
   */
  public init(): void {
    document.querySelectorAll('[data-animation]').forEach(element => {
      element.classList.add('ready');
      this.observer.observe(element);
      this.animatedElements.add(element);
    });
  }

  /**
   * Cleans up animations and resets the instance
   */
  public destroy(): void {
    this.observer.disconnect();
    this.animatedElements.forEach(element => {
      element.classList.remove('animated', 'ready');
    });
    this.animatedElements.clear();
    ScrollAnimations.instance = null;
  }

  /**
   * Handles intersection events for observed elements
   */
  private handleIntersection = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach(({ isIntersecting, target }) => {
      if (isIntersecting) {
        const element = target as HTMLElement;
        const delay = parseFloat(element.dataset.delay || '0') * 1000;

        setTimeout(() => element.classList.add('animated'), delay);
        this.observer.unobserve(element);
        this.animatedElements.delete(element);
      }
    });
  }
}
