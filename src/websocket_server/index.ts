import * as WebSocket from "ws";
import {MessageTypes} from "../constants/constants";
import {createErrorResponse} from "../utils/utils";
import {register} from "../modules/registration";
import { httpServer } from "../http_server";
import { createRoom } from "../modules/create_room";

export const webSocketServer = new WebSocket.Server({ server: httpServer});
webSocketServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        const {type, id, data} = JSON.parse(message.toString());
        // TODO: remove console.log
        console.log("GET message", JSON.parse(message.toString()));

        switch (type) {
            case MessageTypes.REG:
                register(ws, data, id);
                // updateWinners();
                break;
            case MessageTypes.CREATE_ROOM:
                createRoom(ws, id);
                // updateWinners();
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