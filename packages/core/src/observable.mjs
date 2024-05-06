class Observable {
	observers = new Set();

	/**
	 * @param passedSelectors UpdateMethod is only run if selector is present, or an empty array is passed.
	 * @param updateMethod  Method that is used to update the component. (newState, oldState, selector) => use states and selector to control updates
	 * @returns 
	 */
	subscribe(updateMethod, ...args) {
		const selectors = [...args];

		const observer = {
			overRideSelectors: !selectors.length,
			selectors,
			updateMethod,
			unsubscribe: (createdObserver) =>
				this.observers.delete(createdObserver),
		};

		this.observers.add(observer);

		return observer;
	}

	setState(newState, ...args) {
		const selectors = [...args]
		this.state = newState;
		this.broadcastUpdate(selectors);
	}

	updateObservers(selector) {
		this.observers.forEach((observer) => {
			if (observer.overRideSelectors || !selector || observer.selectors.includes(selector)) {
				observer.updateMethod(this.state, this.oldState, selector);
			}
		});
	}

	// This broadcasts to all observers(subscribers).
	broadcastUpdate(selectors) {
		if (!selectors?.length) {
			this.updateObservers()
		} else {
			selectors.forEach((selector) => this.updateObservers(selector))
		}

		this.oldState = this.state;
	}
}

export { Observable };
