export default class WebSocketClient {
    constructor(url) {
        this.url = url;
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.connection = new WebSocket(this.url);
            this.connection.onopen = () => {
                resolve();
            };
            this.connection.onerror = (e) => {
                reject(e);
            };
        });
    }
    findMatch() {
        this.connection.send('FindMatch');
    }
}
