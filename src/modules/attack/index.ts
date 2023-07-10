import WebSocket from "ws";
import {
  createErrorResponse,
  createChangeTurnResponse,
} from "../../utils/responses";
import { Rooms } from "../../store/rooms";
import { ErrorMessages, LogMessages } from "../../constants/constants";
import { Players } from "../../store/players";
import { attackAction } from "../../utils/attack";

export const attack = (ws: WebSocket, data: any, id: number) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
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

  if (Players.isFieldHit(x, y, otherPlayer)) {
    const errorResponse = createErrorResponse(id, ErrorMessages.TARGET_FIELD_IS_HIT);
    const changeTurnResponse = createChangeTurnResponse(id, room.turn);

    ws.send(errorResponse);
    ws.send(changeTurnResponse);

    console.log(LogMessages.SEND_MESSAGE, errorResponse);
    console.log(LogMessages.SEND_MESSAGE, changeTurnResponse);
    return;
  }

  attackAction(currentPlayer, otherPlayer, room, id, { x, y});
}