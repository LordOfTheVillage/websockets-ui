import WebSocket from "ws";
import { Players } from "../../store/players";
import { Rooms } from "../../store/rooms";
import { createCreateGameResponse, createErrorResponse } from "../../utils/utils";
import { ErrorMessages } from "../../constants/constants";
import { updateRoom } from "../update_room";

export const addPlayerToRoom = (ws: WebSocket, data: any, id: number) => {
  const { indexRoom } = JSON.parse(data);
  const player = Players.getPlayerByWs(ws);

  // Find the room with the specified index
  const room = Rooms.getRoom(indexRoom);

  if (!room || !player) {
    ws.send(createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${indexRoom}`));
    return;
  }

  Rooms.addPlayerToRoom(indexRoom, player);

  ws.send(createCreateGameResponse(id, room.index, player.index));

  updateRoom(id);
}