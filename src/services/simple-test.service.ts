import { IState, register } from "@app/core/store"
import { StoreObservable } from "@app/core/store";

/**
 * This is just a test service, showing a simple example on how they are used
 * To support reuseability, all state handling should happen in a service, and not in components.
 */
export const simpleTestService = register(class {
	storeObservable: StoreObservable;

	constructor(stateObs: StoreObservable) {
		this.storeObservable = stateObs;
	}

	setLoadStatus(loadStatus: IState['loadStatus']) {
		// When using setState, it triggers an update on all that subscribes to that state and/or given selector.
		this.storeObservable.setState({
			...this.storeObservable.state,
			loadStatus
			// We pass 'loadStatus' as a selector, so that our subscribers can listen specifically for that.
		}, 'testValues')
	}
})