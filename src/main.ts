import { ShadowElement, wcDefine } from '@app/core/wcshadow';
import '@app/modules/color-wave';

wcDefine('my-app', class extends ShadowElement {

	constructor() {
		super();
		this.render()
	}


	async render() {
		this.shadow.innerHTML = "<div>Loading</div>"

		this.shadow.innerHTML = await this.getTemplate('/templates/myhtml.html')
	}
});