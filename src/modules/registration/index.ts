import {Players} from "../../store/players";
import {createRegistrationResponse} from "../../utils/responses";
import WebSocket from "ws";
import {ErrorMessages} from "../../constants/constants";
import { updateRoom } from "../update_room";

export const register = (ws: WebSocket, data: any, id: number) => {
    const { name, password } = JSON.parse(data);

    const player = Players.getPlayer(name);
    if (player) {
        ws.send(createRegistrationResponse(id, name, 0, true, ErrorMessages.PLAYER_EXISTS));
        return;
    }

    const newPlayer = { name, password, ws };
    Players.addPlayer(newPlayer);
    const index = Players.getPlayer(name)!.index;

    ws.send(createRegistrationResponse(id, name, index, false));

    updateRoom(id);
}