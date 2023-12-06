import { StoreObserver } from "@app/core/store";

export class ShadowElement extends HTMLElement {
	shadow: ShadowRoot;
	storeObserver: StoreObserver;

	static defaultOptions: ShadowRootInit = {
		mode: 'open'
	}

	constructor(options?: ShadowRootInit) {
		super();
		this.shadow = this.attachShadow(options || ShadowElement.defaultOptions);
	}

	/**
	 * Find element in shadowDom
	 * Don't use in attributeChangedCallback or before dom has been written
	 * @param query html query to find element in this.shadow
	 * @returns
	 */
	shadowSelector<T extends HTMLElement>(query: string) {
		return this.shadow.querySelector(query) as T;
	}

	async getTemplate(src: string) {
		const response = await fetch('/templates/myhtml.html')
		return response.text();
	}
}

export function wcDefine(
	name: string,
	webcomponentClass: CustomElementConstructor
) {
	if (!window.customElements?.get(name)) {
		window.customElements.define(name, webcomponentClass);
	}

	return name;
}

