import * as WebSocket from "ws";
import { ErrorMessages, LogMessages, MessageTypes } from "../constants/constants";
import {createErrorResponse} from "../utils/responses";
import {register} from "../modules/registration";
import { httpServer } from "../http_server";
import { createRoom } from "../modules/create_room";
import { addShips } from "../modules/add_ships";
import { addPlayerToRoom } from "../modules/add_player_to_room";
import { attack } from "../modules/attack";
import { randomAttack } from "../modules/random_attack";
import { updateWinners } from "../modules/update_winners";
import { closeSocket } from "../modules/close_socket";

export const webSocketServer = new WebSocket.Server({ server: httpServer});
webSocketServer.on('connection', (ws) => {
    console.log(LogMessages.PLAYER_CONNECTED);

    ws.on('message', (message) => {
        const messageObject = JSON.parse(message.toString());
        const {type, id, data} = messageObject;
        console.log(LogMessages.RECEIVE_MESSAGE, messageObject);

        switch (type) {
            case MessageTypes.REG:
                register(ws, data, id);
                updateWinners(id);
                break;
            case MessageTypes.CREATE_ROOM:
                createRoom(ws, id);
                updateWinners(id);
                break;
            case MessageTypes.ADD_PLAYER_TO_ROOM:
                addPlayerToRoom(ws, data, id);
                break;
            case MessageTypes.ADD_SHIPS:
                addShips(ws, data, id);
                break;
            case MessageTypes.ATTACK:
                attack(ws, data, id)
                break;
            case MessageTypes.RANDOM_ATTACK:
                randomAttack(ws, data, id)
                break;
            default:
                ws.send(createErrorResponse(id, `${ErrorMessages.INVALID_MESSAGE_TYPE}: ${type}`));
                break;
        }
    });

    ws.on('close', () => {
        closeSocket(ws);
        console.log(LogMessages.PLAYER_DISCONNECTED);
    });
});

export const broadcastResponse = (response: any) => {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(response);
        }
    });
}