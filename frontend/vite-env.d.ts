/// <reference types="svelte" />
/// <reference types="vite/client" />

import type htmx from "htmx.org"
import type { Core } from "@unseenco/taxi"

declare global {
	interface Window {
		htmx: htmx
		Taxi: Core
		_paq?: unkown
		CookieConsent?: unknown
	}
}
