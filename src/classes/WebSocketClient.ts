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
                resolve()
            }
            this.connection.onerror = (e) => {
                reject(e)
            }
        })
    }

    async findMatch (): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.send('FindMatch')
            this.connection.onmessage = (e) => {
                if (!e.data) {
                    return
                }
                const response = JSON.parse(e.data)
                if (response.status !== 200) {
                    reject('An error has occured')
                    return
                }
                resolve()
            }
        })
    }
}