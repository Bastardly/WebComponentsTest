import { testService } from "@test/_test.service";

/*
Just some added mock tests
 */

function isEqual(value: number) {
	return value%2 === 0
}


export function runUnitTests() {
	const filePath = '@app/somewhere/somefile.ts';

	if (isEqual(2)) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "isEqual should return equal values as true"
		})
	}

	if (!isEqual(1)) {
		testService.addErrorMsg({
			filePath,
			errorMsg: "isEqual should return inequal values as false"
		})
	}

}