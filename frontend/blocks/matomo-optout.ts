;(() => {
	if (!window._paq) return
	const block: HTMLElement | null = document.querySelector(".matomo-optout")
	if (!block) return
	const checkbox: HTMLInputElement | null = block.querySelector("input")
	if (!checkbox) return
	const optedInLabel = block.dataset.labelOptedIn ?? ""
	const optedOutLabel = block.dataset.labelOptedOut ?? ""

	function setOptOutText(element: HTMLInputElement) {
		window._paq.push([
			function () {
				//@ts-ignore
				element.checked = !this.isUserOptedOut()
				const label: HTMLSpanElement | null | undefined = block?.querySelector("label[for=optout] span")
				if (!label) return
				//@ts-ignore
				label.innerText = this.isUserOptedOut() ? optedOutLabel : optedInLabel
			}
		])
	}

	checkbox.addEventListener("click", function () {
		if (this.checked) {
			window._paq.push(["forgetUserOptOut"])
		} else {
			window._paq.push(["optUserOut"])
		}
		setOptOutText(checkbox)
	})
	setOptOutText(checkbox)
})()
