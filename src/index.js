window.customElements.define('my-app', class extends HTMLElement {

	constructor() {
		super();
		this.render()
	}

	async render() {
		this.innerHTML = "<div>Loading</div>"

		const response = await fetch('/templates/myhtml.html')
		const template = await response.text();

		this.innerHTML = template;
	}
});