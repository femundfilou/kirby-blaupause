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

	onEnter(): void {
		// Update template dataset
		const page = this.page as Document
		const newTemplate = page.body.dataset.template
		document.body.dataset.template = newTemplate
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
