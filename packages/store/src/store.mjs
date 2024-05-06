import { Observable } from '@app/core';

export class StoreObservable extends Observable {
	constructor() {
		super();
		this.state = {
			loadStatus: 'Not initialized',
			testValues: {},
		};
	}
}

export const store = new StoreObservable();

export function register(Service) {
	return new Service(store);
}

