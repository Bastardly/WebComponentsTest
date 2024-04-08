import "@app/modules/blue-text";
import { testService } from "@test/_test.service";
import { IContainer } from "./types";

export function runPageTest(createContainer: () => IContainer) {
	const container = createContainer();
	const filePath = '@app/modules/blue-text.ts';
	const iframe = document.createElement('iframe');
    iframe.src = "/";

	container.appendChild(iframe)

    iframe.contentWindow.addEventListener("load", () => {
        const collection = iframe.contentDocument.querySelectorAll('my-app');  
            testService.test({
                result: collection.length,
                expected: 1,
                filePath,
                errorMsg: "Page should contain one my-app custom component"
            })

            const myApp = iframe.contentDocument.querySelector('my-app');
            const blueTexts = myApp?.shadowRoot?.querySelectorAll('blue-text');
            const blueText = myApp?.shadowRoot?.querySelector('blue-text') as HTMLElement;

            testService.test({
                result: blueTexts?.length,
                expected: 1,
                filePath,
                errorMsg: "MyApp should contain one blue-text"
            })

            testService.test({
                result: blueText.innerText,
                expected: 'This is the custom component we will be testing!',
                filePath,
                errorMsg: "MyApp should contain one blue-text"
            })

            container.destroy(); 
    });  
}