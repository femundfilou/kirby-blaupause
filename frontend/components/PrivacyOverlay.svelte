<script lang="ts">
	export let poster: string;
	export let provider: string;
	export let allowPlayback: () => void;
	export let message: string;
	export let buttonText: string;
</script>

<div class="privacy-overlay">
	<div class="privacy-overlay__background">
		{#if poster}
			<img src={poster} alt={provider} />
		{/if}
	</div>
	<div class="privacy-overlay__content">
		<div class="privacy-overlay__content__inner">
			<p class="is-size-6-touch">
				{message.replace("{provider}", provider)}
			</p>
			<button class="button is-dark-khaki mt-6" on:click={allowPlayback}>
				{buttonText}
			</button>
		</div>
	</div>
</div>

<style>
	.privacy-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;

		& .privacy-overlay__background {
			grid-row: 1/-1;
			grid-column: 1/-1;
			position: relative;
			z-index: 2;
			& img {
				border-radius: var(--clea-border-radius);
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		& .privacy-overlay__content {
			grid-row: 1/-1;
			grid-column: 1/-1;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			z-index: 3;
			padding: 1.5em;
			& .privacy-overlay__content__inner {
				font-family: cssvar(font-family-sans);
				border-radius: var(--clea-border-radius);
				color: cssvar(color-white);
				background-color: cssvar(color-dark-chocolate);
				padding: 2em;
				text-align: center;
				& p {
					font-family: cssvar(font-family-sans);
				}
			}
		}
	}
</style>
