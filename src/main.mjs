import { ShadowElement, wcDefine } from "@app/core";
import "./modules/blue-text";
import "./modules/color-wave";
import { logService } from "./services/log.service.mjs";
import { pageStore } from "./stores/page-store.mjs";

logService.log(`main.mjs loaded`);

wcDefine(
  "my-app",
  class extends ShadowElement {
    constructor() {
      super();
      logService.log(
        `main.mjs my-app initial loadStatus is: ${
          pageStore.getState().loadStatus
        }`
      );

      // Here we subscribe to store changes. Then we can compare the changes we want, and fully control how we update our component
      this.unsubscriber = pageStore.subscribe((newState, oldState) =>
        this.pageUpdateMethod(newState, oldState)
      );
      this.render();
    }

    pageUpdateMethod(newState, oldState) {
      if (newState["loadStatus"] !== oldState?.["loadStatus"]) {
        // If condition is met, we add an update to our dom.
        logService.log(`main.ts loadstatus, ${newState.loadStatus}`);
        if (newState.loadStatus === "Loaded") {
          console.log("Locked and ready mylord!");
        }
      }
    }

    async render() {
      // Here we write our inner html as a template string.
      this.shadow.innerHTML = `<h3>LOADING</h3>`;

      pageStore.setState({ loadStatus: "Loading" });

      // Here we load an html template from our public templates folder
      this.shadow.innerHTML = await this.getTemplate("/templates/myhtml.html");
      pageStore.setState({ loadStatus: "Loaded" });
    }

    disconnedtedCallback() {
      pageStore.unsubscribe(this.unsubscriber);
    }
  }
);
