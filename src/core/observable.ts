export type IUpdateMethod<T> = (
	newValues: T,
	oldState: T,
	selector: keyof T,
) => void | Promise<void>;

export interface IObserver<T> {
	overRideSelectors: boolean;
	selectors: (keyof T)[];
	updateMethod: IUpdateMethod<T>;
	unsubscribe: (value: IObserver<T>) => boolean;
}

class Observable<T> {
	observers: Set<IObserver<T>> = new Set();
	state!: T;
	oldState!: T;

	/**
	 * 
	 * @param passedSelectors UpdateMethod is only run if selector is presemt, or an empty array is passed.
	 * @param updateMethod  Method that is used to update the component. (newState, oldState, selector) => use states and selector to control updates
	 * @returns 
	 */
	subscribe(updateMethod: IUpdateMethod<T>, ...args: (keyof T)[]) {
		const selectors = [...args];

		const observer: IObserver<T> = {
			overRideSelectors: !selectors.length,
			selectors,
			updateMethod,
			unsubscribe: (createdObserver: IObserver<T>) =>
				this.observers.delete(createdObserver),
		};

		this.observers.add(observer);

		return observer;
	}

	setState(newState: T, ...args: (keyof T)[]) {
		const selectors = [...args]
		this.state = newState;
		this.broadcastUpdate(selectors);
	}

	updateObservers(selector?: keyof T) {
		this.observers.forEach((observer) => {
			if (observer.overRideSelectors || !selector || observer.selectors.includes(selector)) {
				observer.updateMethod(this.state, this.oldState, selector);
			}
		});
	}

	// Denne broadcaster updates til alle observers(subscribers).
	broadcastUpdate(selectors?: (keyof T)[]) {



		if (!selectors?.length) {
			this.updateObservers()
		} else {
			selectors.forEach(this.updateObservers)
		}

		this.oldState = this.state;
	}
}

export { Observable };
