import "@app/modules/blue-text";
import { testService } from "@test/_test.service";

/*
 There are some limitations to this. In order to test the contents of the shadowDom (unless it is written in the constructor)
 we have to mount the test component into the actual dom.

 But this mean we can create a test page for actual UI tests
 */
export function runBlueTextTest() {
	const filePath = '@app/modules/blue-text.ts';
	const blueText = document.createElement('blue-text');


	// We let this error fail on purpose to show it works
	if (true) {
		testService.addErrorMsg({
			id: '1',
			filePath,
			errorMsg: 'This error is intended - And'
		})
	}

	if (blueText.shadowRoot.mode !== 'open') {
		testService.addErrorMsg({
			id: '2',
			filePath,
			errorMsg: "Expected shadowRoot's mode to be open"
		})
	}
}