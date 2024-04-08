import "@app/modules/blue-text";
import { testService } from "@test/_test.service";
import { IContainer } from "./types";

export function runBlueTextTest(createContainer: () => IContainer) {
	const container = createContainer();
	const filePath = '@app/modules/blue-text.ts';
	const blueText = document.createElement('blue-text');
	container.appendChild(blueText)
	const innerParagraph = blueText.shadowRoot.querySelector('p');

		testService.test({
			result: blueText.innerText,
			expected: '',
			filePath,
			errorMsg: "blueText's innerText is not an empty string when created."
		})

		testService.test({
			result: !!blueText.shadowRoot,
			expected: true,
			filePath,
			errorMsg: "blueText should have a shadowDOM"
		})	

		testService.test({
			result: blueText.shadowRoot.styleSheets[0].cssRules[0].cssText,
			expected: "p { color: blue; }",
			filePath,
			errorMsg: "blueText should have styleTag with correct styling"
		})

		testService.test({
			result: !innerParagraph,
			expected: false,
			filePath,
			errorMsg: "blueText should contain a paragraph"
		})

		testService.test({
			result: innerParagraph?.innerHTML,
			expected: "<slot></slot>",
			filePath,
			errorMsg: `blueText's paragraph should container a slot, recieved: ${innerParagraph?.innerHTML}`
		})

		testService.test({
			result: blueText.shadowRoot.mode,
			expected: 'open',
			filePath,
			errorMsg: "Expected shadowRoot's mode to be open"
		})


	container.destroy()
}