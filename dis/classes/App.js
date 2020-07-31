var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class App {
    constructor(webSocketClient) {
        this.webSocketClient = webSocketClient;
        this.mapButtons();
        this.initWebsocket()
            .then(() => {
            this.initListeners();
        })
            .catch(e => alert(e));
    }
    /**
     * Map the html elements
     */
    mapButtons() {
        this.$findMatch_btn = document.querySelector('.js-find-match');
    }
    /**
     * Initialize websocket connection
     */
    initWebsocket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.webSocketClient.connect();
                return Promise.resolve();
            }
            catch (e) {
                return Promise.reject('Unable to connect. Please try again later');
            }
        });
    }
    /**
     * Initialize listeners buttons
     */
    initListeners() {
        this.$findMatch_btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.webSocketClient.findMatch();
            }
            catch (e) {
                alert('Unable to find match.');
            }
        }));
        return this;
    }
}
