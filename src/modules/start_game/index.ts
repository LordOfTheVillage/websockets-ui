import { Room } from "../../types/types";
import { createChangeTurnResponse, createStartGameResponse } from "../../utils/responses";

export const startGame = (id: number, room: Room) => {
  const playersInRoom = room.players.length;
  room.turn = Math.floor(Math.random() * playersInRoom);

  for (const player of room.players) {
    player.ws.send(
      createStartGameResponse(
        id, player.ships!, room.turn
      )
    );

    player.ws.send(
      createChangeTurnResponse(id, room.turn)
    );
  }
}