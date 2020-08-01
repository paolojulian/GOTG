import WebSocketClient from './WebSocketClient'

export class App {
    private webSocketClient: WebSocketClient

    // HTML Elements
    private $findMatch_btn: HTMLButtonElement
    private $findingMatch_text: HTMLElement
    private $topPage_div: HTMLDivElement
    private $pieceSelection_div: HTMLDivElement

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
        this.$findingMatch_text = document.querySelector('.js-finding-match') as HTMLElement
        this.$topPage_div = document.querySelector('.js-top-page') as HTMLDivElement
        this.$pieceSelection_div = document.querySelector('.js-piece-selection') as HTMLDivElement
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
            this.$findMatch_btn.classList.add('hidden')
            this.$findingMatch_text.classList.remove('hidden')
            try {
                await this.webSocketClient.findMatch()
                // Match was found
                this.$findMatch_btn.classList.remove('hidden')
                this.$findingMatch_text.classList.add('hidden')
                this.$topPage_div.classList.add('hidden')
                this.$pieceSelection_div.classList.remove('hidden')
            } catch (e) {
                alert('Unable to find match.')
                this.$findMatch_btn.classList.remove('hidden')
                this.$findingMatch_text.classList.add('hidden')
            }
        })
        return this
    }
}