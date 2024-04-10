# About
This is a POC testing how we could create a project with zero dependencies.

The only dev-dependencies used are: ViteJs and TypeScript.

## This POC includes:
* Web Components
* A simple ShadowElement extention class to build HTMLElements with ShadowDom
* Custom store based on basic observable
* An example of how we could do simple testing in the browser - Could be handled by Puppeteer.
* An example on how to use real html templates with Web Components using fetch - Though it's not performant. There are better options.

Zero dependency POC project with web components and observables. Testing is handled in the browser, but can be ported to Puppeteer.

# Understanding the code

Look at vite.config.js and package.json

There are two routes `"/"` and `"/testpage"`. `"/"` handles the main page, and the other handles the testing. 

`index.html` calls `/src/main.ts`, where `<my-app>` is defined as a custom component. `main.ts` also fetches the html from the `public` folder `/templates/myhtml.html`.

`/scr/main.ts` also define `<test-layer>` which contains an iframe to run the tests in the background through the `"/testpage"` route. It also listens for updates on the localStorage to update the UI.

The `/test` folder contains the tests running.

# Install and start
```
npm i
npm run dev
```



