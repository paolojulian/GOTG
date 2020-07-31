import { App } from './classes/App.js';
import WebSocketClient from './classes/WebSocketClient.js';
new App(new WebSocketClient('ws://127.0.0.1:8999'));
