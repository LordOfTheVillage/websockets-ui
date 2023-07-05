import WebSocket from "ws";
import {
  createErrorResponse,
  createChangeTurnResponse
} from "../../utils/responses";
import { Rooms } from "../../store/rooms";
import { ErrorMessages } from "../../constants/constants";
import { Players } from "../../store/players";
import { attackAction } from "../../utils/attack";

export const attack = (ws: WebSocket, data: any, id: number) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(data);
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

  const otherPlayer = room.players.find((p) => p.index !== currentPlayer.index)!;

  if (Players.isFieldHit(x, y, otherPlayer)) {
    ws.send(createErrorResponse(id, ErrorMessages.TARGET_FIELD_IS_HIT));
    ws.send(createChangeTurnResponse(id, room.turn));
    return;
  }

  attackAction(currentPlayer, otherPlayer, room, id, { x, y});
}