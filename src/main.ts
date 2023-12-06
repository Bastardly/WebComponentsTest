import { ShadowElement, wcDefine } from '@app/core/wcshadow';
import '@app/modules/blue-text';
import '@app/modules/color-wave';

wcDefine('my-app', class extends ShadowElement {
	constructor() {
		super();
		this.render()
	}

	async render() {
		this.shadow.innerHTML = `<h3>LOADING</h3>`

		this.shadow.innerHTML = await this.getTemplate('/templates/myhtml.html')
	}
});