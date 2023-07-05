import { Room } from "../../types/types";
import { createChangeTurnResponse, createStartGameResponse } from "../../utils/responses";
import { LogMessages } from "../../constants/constants";

export const startGame = (id: number, room: Room) => {
  const playersInRoom = room.players.length;
  room.turn = Math.floor(Math.random() * playersInRoom);

  for (const player of room.players) {

    const startGameResponse = createStartGameResponse(id, player.ships!, room.turn)
    const changeTurnResponse = createChangeTurnResponse(id, room.turn);

    player.ws.send(startGameResponse);
    player.ws.send(changeTurnResponse);

    console.log(LogMessages.SEND_MESSAGE, startGameResponse);
    console.log(LogMessages.SEND_MESSAGE, changeTurnResponse);

  }
}