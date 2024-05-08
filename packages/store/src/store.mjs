import { Observable } from "@app/core";

export class StoreObservable extends Observable {
  /**
   * @typedef {Object} TestValues
   * @property {string} loadStatus - The user's first name.
   * @property {TestValues} testValues - The user's last name.
   */

  /**
   * @typedef {Object} State
   * @property {string} loadStatus
   * @property {TestValues} testValues
   */
  state = {
    loadStatus: "Not initialized",
    testValues: {},
  };
}

export const store = new StoreObservable();

export function register(Service) {
  return new Service(store);
}
