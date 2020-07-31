export default class WebSocketClient {
    private connection: WebSocket
    private url: string

    constructor (url: string) {
        this.url = url
    }

    connect (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection = new WebSocket(this.url)
            this.connection.onopen = (e) => {
                //eslint-disable-next-line
                console.log(e)
                resolve()
            }
            this.connection.onerror = (e) => {
                reject(e)
            }
        })
    }

    findMatch (): void {
        this.connection.send('FindMatch')
    }
}