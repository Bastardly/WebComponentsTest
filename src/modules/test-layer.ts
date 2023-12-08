import { ShadowElement, wcDefine } from "@app/core/wcshadow";

wcDefine('test-layer', class extends ShadowElement {
	numberOfErrors = 0;

	constructor() {
		super();
		this.render();

		addEventListener("storage", (event: StorageEvent) => {
			if (event.key === 'tests' && event.newValue !== event.oldValue) {
				const parsed = JSON.parse(event.newValue);
				this.numberOfErrors = Object.keys(parsed).length;

				if (this.numberOfErrors > 0) {
					console.error(parsed)
					this.updateLink();
				}
			}
		});

	}

	updateLink() {
		const link = this.shadowSelector<HTMLLinkElement>('a');
		link.innerText = `Errors: ${this.numberOfErrors} - Check console`;
	}

	render() {
		this.shadow.innerHTML = /*html*/`
		<style>
			a {
				text-decoration: none;
				padding: 6px 8px;
				background: red;
				color: white;
				font-weight: bold;
				border: 1px solid darkred;
			}
			
			iframe {
				height: 1px;
				width: 1px;
				opacity: 0;
				z-index: 0;
			}
		</style>
		<a href="/testpage" title="Check console"></a>
		<iframe src="/testpage" />
		`
		this.updateLink();


	}
})