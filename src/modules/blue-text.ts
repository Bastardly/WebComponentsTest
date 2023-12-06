import { ShadowElement, wcDefine } from "@app/core/wcshadow";

wcDefine('blue-text', class extends ShadowElement {
	connectedCallback() {
		this.shadow.innerHTML = /*html*/ `
				<style>
			p {
				color: blue
			}
		</style>

			<p><slot></slot><p>
		`;
	}
});