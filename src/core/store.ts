import { IObserver, Observable } from '@app/core/observable';

interface ITestError {
	filePath: string;
	errorMsg: string;
}

export interface IState {
	loadStatus: 'Not initialized' | 'Not loaded' | 'Loaded';
	testErrors: ITestError[];
}

const initialState: IState = {
	loadStatus: 'Not initialized',
	testErrors: [],
}


export class StoreObservable extends Observable<IState> {
	constructor() {
		super();
		this.state = initialState;
	}
}

type ServiceConstructor<T> = new (store: StoreObservable) => T;

export type StoreObserver = IObserver<IState>;
export const store = new StoreObservable();
export function register<T>(Service: ServiceConstructor<T>): T {
	return new Service(store);
}

