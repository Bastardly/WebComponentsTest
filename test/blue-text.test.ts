import "@app/modules/blue-text";
import { testService } from "@test/_test.service";
import { IContainer } from "./types";

export function runBlueTextTest(createContainer: () => IContainer) {
	const container = createContainer();
	const filePath = '@app/modules/blue-text.ts';
	const blueText = document.createElement('blue-text');
	container.appendChild(blueText)

	if (blueText.innerText !== '') {
		testService.addErrorMsg({
			filePath,
			errorMsg: "blueText's innerText is not an empty string when created."
		})
	}

	if (!blueText.shadowRoot) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "blueText should have a shadowDOM"
		})
	}

	if (blueText.shadowRoot.styleSheets[0].cssRules[0].cssText !== "p { color: blue; }") {
		testService.addErrorMsg({
			filePath,
			errorMsg: "blueText should have styleTag with correct styling"
		})
	}

	blueText.innerText = 'This is the innerText'
	const innerParagraph = blueText.shadowRoot.querySelector('p');

	// @ts-expect-error - This is a custom component
	if (!blueText.p || !innerParagraph) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "blueText should contain a paragraph"
		})
	}

	if (innerParagraph?.innerHTML !== "<slot></slfot>") {
		testService.addErrorMsg({
			filePath,
			errorMsg: `blueText's paragraph should container a slot, recieved: ${innerParagraph?.innerHTML}`
		})
	}

	if (blueText.shadowRoot.mode !== 'open') {
		testService.addErrorMsg({
			filePath,
			errorMsg: "Expected shadowRoot's mode to be open"
		})
	}

	if (blueText.shadowRoot.mode !== 'open') {
		testService.addErrorMsg({
			filePath,
			errorMsg: "Expected shadowRoot's mode to be open"
		})
	}

	container.destroy()
}