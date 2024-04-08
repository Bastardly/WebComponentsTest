import { runBlueTextTest } from "@test/blue-text.test";
import { runUnitTests } from "@test/unit.test";
import { runPageTest } from "@test/page.test";
import './error-box';
import { IContainer } from "./types";
import { testService } from "./_test.service";


(() => {
	const componentContainer = document.getElementById('components');
	const clearButton = document.createElement('button');
	clearButton.onclick = () => testService.clearErrors();
	clearButton.innerText = "Clear tests and reload"
	componentContainer.appendChild(clearButton);

	const createContainer = () => {
		// @ts-expect-error - We are doing this on purpose
		const div = document.createElement('div') as IContainer;
		componentContainer.appendChild(div);

		div.destroy = () => {
			componentContainer.removeChild(div)
		}

		return div;
	}

	runBlueTextTest(createContainer);
	runPageTest(createContainer);
	runUnitTests();
})()