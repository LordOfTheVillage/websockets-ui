import { Rooms } from "../../store/rooms";
import { Players } from "../../store/players";
import WebSocket from "ws";
import { createCreateGameResponse } from "../../utils/responses";
import { LogMessages } from "../../constants/constants";

export const createRoom = (ws: WebSocket, id: number) => {
  const room = Rooms.createRoom();
  const player = Players.getPlayerByWs(ws);

  if (player) {
    Rooms.addPlayerToRoom(room.index, { ...player });
  }
  const response = createCreateGameResponse(id, room.index, player?.index || 0);
  ws.send(response);
  console.log(LogMessages.SEND_MESSAGE, response);
}