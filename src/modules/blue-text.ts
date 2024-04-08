import { ShadowElement, wcDefine } from "@app/core/wcshadow";


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