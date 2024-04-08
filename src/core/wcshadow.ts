import { StoreObserver } from "@app/core/store";

/**
 * ShadowElement extends HTMLElement and attaches shadowRoot and applies a couple of utility methods.
 */
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

	/**
	 * Fetches a HTML template as a string.
	 * NOTE! You cannot use scripts.
	 * @param {string} src Source of the html template asset
	 * @returns {string} html as string
	 */
	async getTemplate(src: string) {
		const response = await fetch(src)
		return response.text();
	}
}


/**
 * wcDefine helps defining custom components:
 * wcDefine('custom-name', class extends ShadowElement { ... })
 */
export function wcDefine(
	name: string,
	webcomponentClass: CustomElementConstructor
) {
	if (!window.customElements?.get(name)) {
		window.customElements.define(name, webcomponentClass);
	}

	return name;
}

