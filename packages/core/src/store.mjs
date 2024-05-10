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
    const unsubscriber = Symbol();

    this.#subscribers.set(unsubscriber, updateMethod);

    return unsubscriber;
  }

  unsubscribe(unsubscriber) {
    if (!this.#subscribers.has(unsubscriber)) {
      throw new Error('Unsubscriber symbol must be the same as when subscribing')
    }

    this.#subscribers.delete(unsubscriber);
  }
}
