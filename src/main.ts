import { store } from "@app/core/store";
import { ShadowElement, wcDefine } from '@app/core/wcshadow';
import '@app/modules/blue-text';
import '@app/modules/color-wave';
import '@app/modules/test-layer';
import { simpleTestService } from './services/simple-test.service';

// ShadowElement is an extended HTMLElement which uses shadowDom and was a few methods like shadowSelector and getTemplate
wcDefine('my-app', class extends ShadowElement {
	constructor() {
		super();

		// Here we subscribe to store changes. Then we can compare the changes we want, and fully control how we update our component
		this.storeObserver = store.subscribe((newState, oldState) => {
			if (newState['loadStatus'] !== oldState?.['loadStatus']) {

				// If condition is met, we add an update to our dom.
				if (newState.loadStatus === 'Loaded') {
					const p = document.createElement('p');
					p.innerText = 'Our page is fully loaded'

					this.shadow.appendChild(p);
				}
			}
			// We choose to add 'loadStatus' as a selector,
			// so that we only receive updates when setState is 
			// called with the 'loadStatus' as secondary parameter
		}, 'loadStatus');
		this.render()
	}

	async render() {
		simpleTestService.setLoadStatus('Not loaded')
		// Here we write our inner html as a template string.
		this.shadow.innerHTML = `<h3>LOADING</h3>`

		// Here we load an html template from our public templates folder
		this.shadow.innerHTML = await this.getTemplate('/templates/myhtml.html')
		simpleTestService.setLoadStatus('Loaded')
	}

	disconnectedCallback() {
		// If our component is removed from the dom tree, we unsubscribe the observer.
		this.storeObserver.unsubscribe(this.storeObserver);
	}
});