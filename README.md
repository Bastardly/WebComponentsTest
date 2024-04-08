# About

Zero dependency POC project with web components and observables. Testing is handled in the browser, but can be ported to Puppeteer.

# Understanding the code

Look at vite.config.js and package.json

There are two routes "/" and "/testpage". "/" handles the main page, and the other handles the testing. 

`index.html` calls `/src/main.ts`, where `<my-app>` is defined as a custom component. `main.ts` also fetches the html from the `public` folder `/templates/myhtml.html`.

# Install and start
```
npm i
npm run dev
```



