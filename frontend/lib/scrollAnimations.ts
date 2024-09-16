import ScrollAnimations from "../services/ScrollAnimations"
import SplitWords from "../services/SplitWords"

export const install = () => {
	// Initialize ScrollAnimations
	ScrollAnimations.getInstance()
	// Use Split Words
	new SplitWords()
}
