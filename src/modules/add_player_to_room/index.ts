import WebSocket from "ws";
import { Players } from "../../store/players";
import { Rooms } from "../../store/rooms";
import { createCreateGameResponse, createErrorResponse } from "../../utils/utils";

export const addPlayerToRoom = (ws: WebSocket, data: any, id: number) => {
  const { indexRoom } = data.data;
  const player = Players.getPlayerByWs(ws);

  // Find the room with the specified index
  const room = Rooms.getRoom(indexRoom);

  if (!room || !player) {
    ws.send(createErrorResponse(id, `Room not found: ${indexRoom}`));
    return;
  }

  Rooms.addPlayerToRoom(indexRoom, player);

  ws.send(createCreateGameResponse(id, room.index, player.index));
  // TODO: Send the updated room state to all players in the room
  // updateRoomState();
}