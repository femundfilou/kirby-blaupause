import Lenis from "lenis"

// Add type definition
declare global {
	interface Window {
		lenis: Lenis
	}
}

export const install = (): void => {
	// Initialize Lenis
	window.lenis = new Lenis({
		autoRaf: true
	})
}
