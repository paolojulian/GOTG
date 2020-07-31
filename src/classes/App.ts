import WebSocketClient from './WebSocketClient'

export class App {
    private webSocketClient: WebSocketClient

    // HTML Elements
    private $findMatch_btn: HTMLButtonElement

    constructor (webSocketClient: WebSocketClient) {
        this.webSocketClient = webSocketClient
        this.mapButtons()

        this.initWebsocket()
            .then(() => {
                this.initListeners()
            })
            .catch(e => alert(e))
    }

    /**
     * Map the html elements
     */
    mapButtons (): void {
        this.$findMatch_btn = document.querySelector('.js-find-match') as HTMLButtonElement
    }

    /**
     * Initialize websocket connection
     */
    async initWebsocket (): Promise<void> {
        try {
            await this.webSocketClient.connect()
            return Promise.resolve()
        } catch (e) {
            return Promise.reject('Unable to connect. Please try again later')
        }
    }

    /**
     * Initialize listeners buttons
     */
    initListeners (): this {
        this.$findMatch_btn.addEventListener('click', async () => {
            try {
                await this.webSocketClient.findMatch()
            } catch (e) {
                alert('Unable to find match.')
            }
        })
        return this
    }
}