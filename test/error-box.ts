import { ShadowElement, wcDefine } from "@app/core/wcshadow";
import { store } from "@app/core/store";

wcDefine('error-box', class extends ShadowElement {
    constructor() {
        super()
        const defaultHTML = /* html */ `
            <style>
                div {
                    background: #ffe9e9;
                    border: 1px solid #c15757;
                    border-radius: 5px;
                    padding: 8px 12px;
                    margin-bottom: 8px;
                }
    </style>
        `
        store.subscribe((state) => {
            this.shadow.innerHTML = defaultHTML;
            Object.values(state.testErrors).forEach((err) => {
                const div = document.createElement('div');
                div.innerText = JSON.stringify(err);
                this.shadow.appendChild(div)
            })
        }, 'testErrors')
    }
})