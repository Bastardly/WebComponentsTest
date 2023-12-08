import { testService } from "@test/_test.service";

/*
Just some added mock tests
 */
export function runUnitTests() {
	const filePath = '@app/somewhere/somefile.ts';

	if (Math.random() < 0.5) {
		testService.addErrorMsg({
			id: '1',
			filePath,
			errorMsg: 'The Math.random method was generous'
		})
	}

	if (1 + 1 !== 3) {
		testService.addErrorMsg({
			id: '2',
			filePath,
			errorMsg: "Math is hard",
			expected: 2,
			got: 'something wrong'
		})
	}

	if (1 + 1 !== 2) {
		testService.addErrorMsg({
			id: '3',
			filePath,
			errorMsg: "This should not have failed"
		})
	}
}