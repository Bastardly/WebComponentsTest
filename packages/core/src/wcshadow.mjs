/**
 * ShadowElement extends HTMLElement and attaches shadowRoot and applies a couple of utility methods.
 */
export class ShadowElement extends HTMLElement {
  static defaultOptions = {
    mode: "open",
  };

  constructor(options) {
    super();
    this.shadow = this.attachShadow(options || ShadowElement.defaultOptions);
  }

  /**
   * Find element in shadowDom
   * Don't use in attributeChangedCallback or before dom has been written
   * @param query html query to find element in this.shadow
   * @returns
   */
  shadowSelector(query) {
    return this.shadow.querySelector(query);
  }

  /**
   * Fetches a HTML template as a string.
   * NOTE! You cannot use scripts.
   * @param {string} src Source of the html template asset
   * @returns {string} html as string
   */
  async getTemplate(src) {
    const response = await fetch(src);
    return response.text();
  }
}

/**
 * wcDefine helps defining custom components:
 * wcDefine('custom-name', class extends ShadowElement { ... })
 */
export function wcDefine(name, webcomponentClass) {
  if (!window.customElements?.get(name)) {
    window.customElements.define(name, webcomponentClass);
  }

  return name;
}
