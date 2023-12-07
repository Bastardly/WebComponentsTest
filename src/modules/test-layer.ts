import { store } from "@app/core/store";
import { ShadowElement, wcDefine } from "@app/core/wcshadow";
import { runBlueTextTest } from "@app/tests/blue-text.test";
import { runUnitTests } from "@app/tests/unit.test";

wcDefine('test-layer', class extends ShadowElement {
	numberOfErrors = 0;

	constructor() {
		super();
		this.render();


		this.storeObserver = store.subscribe((newState) => {
			this.numberOfErrors = newState.testErrors.length;
			console.error(newState.testErrors)
			this.render();
		}, 'testErrors')

		this.runTests();
	}

	runTests() {
		runBlueTextTest();
		runUnitTests();
	}

	handleClick() {
		alert('Her kunne vi åbne en dialog, med pænere oversigt over errors og evt. passed tests')
	}

	render() {
		if (!this.numberOfErrors) {
			this.shadow.innerHTML = "";

			return;
		}

		this.shadow.innerHTML = /*html*/`
		<style>
			button {
				padding: 6px 8px;
				background: red;
				color: white;
				font-weight: bold;
				border: 1px solid darkred;
			}
		</style>
		<button title="Check console">Errors: ${this.numberOfErrors} - Check console</button>
		`

		const btn = this.shadowSelector<HTMLButtonElement>('button');
		btn.onclick = () => this.handleClick();

	}

	disconnectedCallback() {
		// If our component is removed from the dom tree, we unsubscribe the observer.
		this.storeObserver.unsubscribe(this.storeObserver);
	}
})