import {Players} from "../../store/players";
import {createRegistrationResponse} from "../../utils/responses";
import WebSocket from "ws";
import { ErrorMessages, LogMessages } from "../../constants/constants";
import { updateRoom } from "../update_room";

export const register = (ws: WebSocket, data: any, id: number) => {
    const { name, password } = JSON.parse(data);

    const player = Players.getPlayer(name);
    if (player && player.password !== password) {
        const response = createRegistrationResponse(id, name, player.index, true, ErrorMessages.PLAYER_EXISTS);
        ws.send(response);
        console.log(LogMessages.SEND_MESSAGE, response)
        return;
    } else if (player && player.password === password) {
        const response = createRegistrationResponse(id, name, player.index, false);
        ws.send(response);
        console.log(LogMessages.SEND_MESSAGE, response)
        return;
    }

    const newPlayer = { name, password, ws };
    Players.addPlayer(newPlayer);
    const index = Players.getPlayer(name)!.index;

    const response = createRegistrationResponse(id, name, index, false);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response)

    updateRoom(id);
}