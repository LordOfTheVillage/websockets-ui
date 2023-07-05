import WebSocket from "ws";
import { Rooms } from "../../store/rooms";
import {
  createErrorResponse,
} from "../../utils/responses";
import { ErrorMessages } from "../../constants/constants";
import { attackAction, getRandomField } from "../../utils/attack";

export const randomAttack = (ws: WebSocket, data: any, id: number) => {
  const { gameId, indexPlayer } = JSON.parse(data);
  const room = Rooms.getRoom(gameId);

  if (!room) {
    ws.send(createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${gameId}`));
    return;
  }

  const currentPlayer = room.players[indexPlayer];
  if (!currentPlayer) {
    ws.send(createErrorResponse(id, `${ErrorMessages.PLAYER_NOT_FOUND}: ${indexPlayer}`));
    return;
  }

  if (room.turn !== indexPlayer) {
    ws.send(createErrorResponse(id, ErrorMessages.NOT_YOUR_TURN));
    return;
  }

  const otherPlayer = room.players.find((p) => p !== currentPlayer)!;

  const { x, y } = getRandomField(otherPlayer);

  attackAction(currentPlayer, otherPlayer, room, id, { x, y});
}