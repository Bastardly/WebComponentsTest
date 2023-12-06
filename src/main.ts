import { ShadowElement, wcDefine } from './core/wcshadow';

wcDefine('my-app', class extends ShadowElement {

	constructor() {
		super();
		this.render()
	}

	async render() {
		this.shadow.innerHTML = "<div>Loading</div>"

		const response = await fetch('/templates/myhtml.html')
		const template = await response.text();

		this.shadow.innerHTML = template;
	}
});