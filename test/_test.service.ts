import { store } from "@app/core/store";
import { ITestValues } from "@app/core/types";

class TestService  {
	#writeToLocalStorage() {
		window.localStorage.setItem('tests', JSON.stringify(store.state.testValues));
	}

	#addErrorMsg(testError: ITestValues) {
		const id = testError.filePath + testError.errorMsg
		store.setState({
			...store.state,
			testValues: {
				...store.state.testValues,
				[id]: testError
			}
		})

		this.#writeToLocalStorage();
	}

	clearErrors() {
		store.setState({
			...store.state,
			testValues: {}
		})
		this.#writeToLocalStorage();
		window.location.reload();
	}

	test(testValues: ITestValues) {
		if (testValues.expected !== testValues.result) {
			console.log(testValues.expected, testValues.result)
			this.#addErrorMsg(testValues)
		}
	}

}

export const testService = new TestService();