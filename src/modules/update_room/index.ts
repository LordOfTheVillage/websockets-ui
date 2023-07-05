import { broadcastResponse } from "../../websocket_server";
import { Rooms } from "../../store/rooms";
import { createUpdateRoomResponse } from "../../utils/responses";

export const updateRoom = (id: number) => {
  const roomData = Rooms.getRooms().filter((room) => room.players.length < 2).map((room) => ({
    roomId: room.index,
    roomUsers: room.players.map((player) => ({ name: player.name, index: player.index })),
  }));

  const response = createUpdateRoomResponse(id, roomData);
  broadcastResponse(response);
}