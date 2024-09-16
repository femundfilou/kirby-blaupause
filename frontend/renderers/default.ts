import { Renderer } from "@unseenco/taxi"
import { lazyLoad } from "unlazy"
import ScrollAnimations from "../services/ScrollAnimations"
import SplitWords from "../services/SplitWords"

export default class extends Renderer {
	initialLoad() {
		lazyLoad()
		ScrollAnimations.getInstance()
		new SplitWords()
	}
	onLeaveCompleted(): void {
		this.remove()
	}

	onEnterCompleted() {
		lazyLoad()
		new SplitWords()
		ScrollAnimations.reinitialize()
	}
}
