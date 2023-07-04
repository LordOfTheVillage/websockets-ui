import { Room } from "../../types/types";
import { createStartGameResponse } from "../../utils/utils";

export const startGame = (room: Room) => {
  const playersInRoom = room.players.length;
  room.turn = Math.floor(Math.random() * playersInRoom);

  for (const player of room.players) {
    // const playerIndex = player.index;
    // const otherPlayer = room.players.find((p) => p !== player);

    player.ws.send(
      createStartGameResponse(
        // playerIndex,
        // room.index,
        // player.ships,
        // otherPlayer.name,
        // otherPlayer.ships.length
      )
    );
  }
}