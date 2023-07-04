import {Players} from "../../store/players";
import {createRegistrationResponse} from "../../utils/utils";
import WebSocket from "ws";
import {ErrorMessages} from "../../constants/constants";

export const register = (ws: WebSocket, data: any, id: number) => {
    const { name, password } = data.data;

    const player = Players.getPlayer(name);
    if (player) {
        ws.send(createRegistrationResponse(id, name, 0, true, ErrorMessages.PLAYER_EXISTS));
        return;
    }

    const newPlayer = { name, password, ws };
    Players.addPlayer(newPlayer);
    const index = Players.getPlayer(name)!.index;

    ws.send(createRegistrationResponse(id, name, index, false));
}