import * as WebSocket from "ws";
import {httpServer} from "../http_server";

export const webSocketServer = new WebSocket.Server({ server: httpServer });

webSocketServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log( message);
    });
});