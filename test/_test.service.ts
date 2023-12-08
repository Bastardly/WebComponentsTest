
interface IError {
	id: string;
	filePath: string;
	errorMsg: string;
	expected?: unknown;
	got?: unknown;
}

class TestService {
	errors: Record<string, IError> = {}

	writeToLocalStorage() {
		window.localStorage.setItem('tests', JSON.stringify(this.errors));
	}

	addErrorMsg(testError: IError) {
		const id = testError.filePath + testError.id;
		this.errors[id] = testError;

		this.writeToLocalStorage();

	}

	clearErrors() {
		this.errors = {};
		this.writeToLocalStorage();
	}
}

export const testService = new TestService();