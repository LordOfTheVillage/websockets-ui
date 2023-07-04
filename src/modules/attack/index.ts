import WebSocket from "ws";
import { createErrorResponse, createFinishResponse, createAttackResponse } from "../../utils/utils";
import { Rooms } from "../../store/rooms";
import { ErrorMessages, Statuses } from "../../constants/constants";
import { updateRoom } from "../update_room";

export const attack = (ws: WebSocket, data: any, id: number) => {
  const { gameID, x, y, indexPlayer } = JSON.parse(data);
  const room = Rooms.getRoom(gameID);

  if (!room) {
    ws.send(createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${gameID}`));
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

  let status = Statuses.MISS;
  const hitShip = otherPlayer.ships!.find((ship) => ship.position.x === x && ship.position.y === y)!;
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
      status = Statuses.SHOT;
    }
  }

  room.turn = otherPlayer.index;

  currentPlayer.ws.send(createAttackResponse(id, { x, y }, room.turn, status));
  otherPlayer.ws.send(createAttackResponse(id, { x, y }, room.turn, status));

  updateRoom(id);
}