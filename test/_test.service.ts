import { store } from "@app/core/store";
import { IError } from "@app/core/types";


class TestService  {
	writeToLocalStorage() {
		window.localStorage.setItem('tests', JSON.stringify(store.state.testErrors));
	}

	addErrorMsg(testError: IError) {
		const id = testError.filePath + self.crypto.randomUUID();
		store.setState({
			...store.state,
			testErrors: {
				...store.state.testErrors,
				[id]: testError
			}
		})

		this.writeToLocalStorage();

	}

	clearErrors() {
		store.setState({
			...store.state,
			testErrors: {}
		})
		this.writeToLocalStorage();
	}

}

export const testService = new TestService();