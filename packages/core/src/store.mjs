/**
 * @class
 * @template T
 */
export class Store {
  /**
   *
   */
  #subscribers = new Map();

  /**
   * #state is the current state in store
   * @type {T}
   */
  #state;

  /**
   * #oldState is the former state in store
   * @type {T}
   */
  #oldState;

  /**
   * @param {T} state;
   */
  constructor(state) {
    this.#state = state;
    this.#oldState = state;

    if (typeof state !== "object" && Array.isArray(state)) {
      throw new Error("State provided in Store constructor is not an object.");
    }
  }

  getState() {
    return { ...this.#state };
  }

  getOldState() {
    return { ...this.#oldState };
  }

  setState(newState) {
    this.#state = {
      ...this.#state,
      ...newState,
    };

    const stateCopy = this.getState();
    const oldStateCopy = this.getOldState();

    this.#subscribers.forEach((subscriber) =>
      subscriber(stateCopy, oldStateCopy)
    );
    this.#oldState = newState;
  }

  subscribe(updateMethod) {
    const unsubscriber = {};

    this.#subscribers.set(unsubscriber, updateMethod);

    return unsubscriber;
  }

  unsubscribe(unsubscriber) {
    this.#subscribers.delete(unsubscriber);
  }
}
