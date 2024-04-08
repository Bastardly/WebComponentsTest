import { testService } from "@test/_test.service";

/*
Just some added mock tests
 */

function isEqual(value: number) {
	return value%2 === 0
}


export function runUnitTests() {
	const filePath = '@app/somewhere/somefile.ts';

		testService.test({
			result: isEqual(2),
			expected: true,
			filePath,
			errorMsg: "isEqual should return equal values as true"
		})

		testService.test({
			result: isEqual(1),
			expected: false,
			filePath,
			errorMsg: "isEqual should return inequal values as false"
		})
}