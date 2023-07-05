import WebSocket from "ws";
import { Players } from "../../store/players";
import { Rooms } from "../../store/rooms";
import { createCreateGameResponse, createErrorResponse } from "../../utils/responses";
import { ErrorMessages, LogMessages } from "../../constants/constants";
import { updateRoom } from "../update_room";

export const addPlayerToRoom = (ws: WebSocket, data: any, id: number) => {
  const { indexRoom } = JSON.parse(data);
  const player = Players.getPlayerByWs(ws);

  const room = Rooms.getRoom(indexRoom);

  if (!room || !player) {
    const response = createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${indexRoom}`);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }

  Rooms.addPlayerToRoom(indexRoom, player);

  const response = createCreateGameResponse(id, room.index, player.index);
  ws.send(response);
  console.log(LogMessages.SEND_MESSAGE, response);

  updateRoom(id);
}