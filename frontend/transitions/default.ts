import { Transition } from "@unseenco/taxi"
import DebugService from "../services/DebugService"

/**
 * Fade transition for page changes
 *
 */
export default class FadeTransition extends Transition {
	private view: Element | null = null

	/**
	 * Initializes the transition
	 */
	onEnter({
		to,
		trigger,
		done
	}: { to: Element | HTMLElement; trigger: string | false | HTMLElement; done: CallableFunction }): void {
		DebugService.log("Starting enter transition")

		this.view = to.querySelector("#page")
		if (this.view) {
			this.view.classList.add("transition-fade")
		}

		document.documentElement.classList.add("is-changing", "is-animating")

		window.scrollTo({ top: 0, left: 0, behavior: "instant" })

		setTimeout(() => {
			document.documentElement.classList.remove("is-animating", "is-changing")
			done()
			DebugService.log("Enter transition complete")
		}, 550)
	}

	/**
	 * Handles leave transition
	 */
	onLeave({ from, done }: { from: Element | HTMLElement; done: CallableFunction }): void {
		DebugService.log("Starting leave transition")

		this.view = from.querySelector("#page")
		if (this.view) {
			this.view.classList.add("transition-fade")
		}

		document.documentElement.classList.add("is-changing", "is-leaving")

		setTimeout(() => {
			document.documentElement.classList.remove("is-leaving")
			if (this.view) {
				this.view.classList.remove("transition-fade")
			}
			done()
			DebugService.log("Leave transition complete")
		}, 550)
	}
}
