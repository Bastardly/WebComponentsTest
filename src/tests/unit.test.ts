import { testService } from "@app/services/test.service";

/*
Just some added mock tests
 */
export function runUnitTests() {
	const filePath = '@app/somewhere/somefile.ts';

	if (Math.random() < 0.5) {
		testService.addErrorMsg({
			filePath,
			errorMsg: 'The Math.random method was generous'
		})
	}

	if (1 + 1 !== 3) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "Math is hard"
		})
	}

	if (1 + 1 !== 2) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "This should not have failed"
		})
	}

}