import * as WebSocket from "ws";
import {httpServer} from "../http_server";
import {MessageTypes} from "../constants/constants";
import {createErrorResponse} from "../utils/utils";
import {register} from "../modules/registration";

export const webSocketServer = new WebSocket.Server({ server: httpServer });

webSocketServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        const {type, id, data} = JSON.parse(message.toString());

        switch (type) {
            case MessageTypes.REG:
                register(ws, data, id);
                // updateWinners();
                break;
            case MessageTypes.CREATE_ROOM:
                break;
            case MessageTypes.ADD_PLAYER_TO_ROOM:
                break;
            case MessageTypes.ADD_SHIPS:
                break;
            case MessageTypes.ATTACK:
                break;
            case MessageTypes.RANDOM_ATTACK:
                break;
            default:
                ws.send(createErrorResponse(id, `Invalid message type: ${type}`));
                break;
        }
    });
});