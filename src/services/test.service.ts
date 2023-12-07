import { IState, StoreObservable, register } from "@app/core/store";

export const testService = register(class {
	storeObservable: StoreObservable;

	constructor(stateObs: StoreObservable) {
		this.storeObservable = stateObs;
	}

	addErrorMsg(testError: IState['testErrors'][0]) {
		this.storeObservable.setState({
			...this.storeObservable.state,
			testErrors: [...this.storeObservable.state.testErrors, testError]
		}, 'testErrors')
	}
})