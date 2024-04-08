import { runBlueTextTest } from "@test/blue-text.test";
import { runUnitTests } from "@test/unit.test";
import './error-box';
import { IContainer } from "./types";


(() => {
	const componentContainer = document.getElementById('components');

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
	runUnitTests();
})()