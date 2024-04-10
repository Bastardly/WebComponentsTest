import { ShadowElement, wcDefine } from "@app/core/wcshadow";

/**
 * This is a very simple component made for testing purposes that should be easy to understand.
 * Normally, there would be no need to use ShadowDom for this type of Component.
 */
wcDefine('blue-text', class extends ShadowElement {
	p = document.createElement('p');

	constructor() {
		super();
		this.shadow.innerHTML = /*html*/`
		<style>
			p {
				color: blue
			}
		</style>
		`;

		this.p.innerHTML="<slot></slot>"
		this.shadow.appendChild(this.p)
	}
});