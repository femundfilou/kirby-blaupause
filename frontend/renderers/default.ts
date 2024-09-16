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

	onEnterCompleted() {
		this.remove()
		lazyLoad()
		ScrollAnimations.getInstance()
		new SplitWords()
	}
}
