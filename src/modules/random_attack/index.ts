import WebSocket from "ws";
import { Rooms } from "../../store/rooms";
import {
  createErrorResponse,
} from "../../utils/responses";
import { ErrorMessages, LogMessages } from "../../constants/constants";
import { attackAction, getRandomField } from "../../utils/attack";

export const randomAttack = (ws: WebSocket, data: any, id: number) => {
  const { gameId, indexPlayer } = JSON.parse(data);
  const room = Rooms.getRoom(gameId);

  if (!room) {
    const response = createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${gameId}`);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }

  const currentPlayer = room.players[indexPlayer];
  if (!currentPlayer) {
    const response = createErrorResponse(id, `${ErrorMessages.PLAYER_NOT_FOUND}: ${indexPlayer}`);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }

  if (room.turn !== indexPlayer) {
    const response = createErrorResponse(id, ErrorMessages.NOT_YOUR_TURN);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }


  const otherPlayer = room.players.find((p) => p.index !== currentPlayer.index)!;

  const { x, y } = getRandomField(otherPlayer);

  attackAction(currentPlayer, otherPlayer, room, id, { x, y});
}