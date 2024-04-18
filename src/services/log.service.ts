// SIMPLE POC log
class LogService {
        static ignoredRoutes = ['testpage']

		constructor() {
            this.log('-----------------------------------------------------------------')
            this.log(`LOG SERVICE CONSTRUCTED at route: ${window.location.pathname}`)

            window.addEventListener('beforeunload', () => {
                this.log('PAGE RELOAD')
            })
        }

    #getIsNonLogableRoute() {
        const path = window.location.pathname.replaceAll('/', '')

        return LogService.ignoredRoutes.includes(path);
    }

    #createMsg(msg: string) {
        return `${new Date().toLocaleTimeString()} - ${msg}`
    };

    log(msg: string) {
        if (this.#getIsNonLogableRoute()) return;

        try {
            const res = sessionStorage.getItem('log');
                const parsed = JSON.parse(res) || [];
                parsed.unshift(this.#createMsg(msg))
                window.sessionStorage.setItem('log', JSON.stringify(parsed.slice(0, 100)))


        } catch {
            sessionStorage.setItem('log', JSON.stringify([this.#createMsg(msg)]))
        }
    }
    
    

}

export const logService = new LogService();