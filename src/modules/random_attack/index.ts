import WebSocket from "ws";
import { Rooms } from "../../store/rooms";
import {
  createAttackResponse,
  createChangeTurnResponse,
  createErrorResponse,
  createFinishResponse
} from "../../utils/utils";
import { ErrorMessages, Statuses } from "../../constants/constants";
import { Players } from "../../store/players";
// import { updateRoom } from "../update_room";

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

  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);

  if (Players.isFieldHit(x, y, otherPlayer)) {
    ws.send(createErrorResponse(id, ErrorMessages.TARGET_FIELD_IS_HIT));
    return;
  }

  Players.markFieldAsHit(x, y, otherPlayer);

  let status = Statuses.MISS;
  const turn = room.turn;
  const hitShip = otherPlayer.ships!.find((ship) => ship.position.x === x && ship.position.y === y);
  if (hitShip) {
    hitShip.hits++;
    if (hitShip.hits === hitShip.length) {
      status = Statuses.KILLED;
      otherPlayer.ships = otherPlayer.ships!.filter((ship) => ship !== hitShip);
      if (otherPlayer.ships.length === 0) {
        ws.send(createFinishResponse(id, currentPlayer.index));
        return;
      }
    } else {
      status = Statuses.SHOT
    }
  } else {
    room.turn = otherPlayer.index;
  }

  currentPlayer.ws.send(createAttackResponse(id, { x, y }, turn, status));
  otherPlayer.ws.send(createAttackResponse(id, { x, y }, turn, status));

  currentPlayer.ws.send(createChangeTurnResponse(id, room.turn));
  otherPlayer.ws.send(createChangeTurnResponse(id, room.turn));

  // updateRoom(id);
}