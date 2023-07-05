import WebSocket from "ws";
import { Players } from "../../store/players";
import { Rooms } from "../../store/rooms";
import { updateRoom } from "../update_room";
export const closeSocket = (ws: WebSocket) => {
  const player = Players.getPlayerByWs(ws);
  if (player) {
    const room = Rooms.getRoomByPlayerIndex(player.index);

    if (room) {
      const index = room.players.findIndex((p) => p.index === player.index);

      if (index !== -1 && room.players.length > 1) {
        room.players.splice(index, 1);
      } else if (index !== -1 && room.players.length == 1) {
        Rooms.removeRoom(room.index)
      }
    }
  }
  updateRoom(0)
}
