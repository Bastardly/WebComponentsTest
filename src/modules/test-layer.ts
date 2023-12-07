import { ShadowElement, wcDefine } from "@app/core/wcshadow";

wcDefine('test-layer', class extends ShadowElement {
	numberOfErrors = 0;

	constructor() {
		super();
		this.render();
	}
	render() {
		this.shadow.innerHTML = /*html*/`
		<style>
			button {
				padding: 6px 8px;
				background: red;
				color: white;
				font-weight: bold;
				border: 1px solid darkred;
			}
		</style>
		<button>ERRORS: ${this.numberOfErrors}</button>		`
	}
})