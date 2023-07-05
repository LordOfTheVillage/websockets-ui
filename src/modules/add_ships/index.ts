import { Rooms } from "../../store/rooms";
import { createErrorResponse } from "../../utils/responses";
import WebSocket from "ws";
import { startGame } from "../start_game";
import { ErrorMessages } from "../../constants/constants";
import { Ship } from "../../types/types";

export const addShips = (ws: WebSocket, data: any, id: number) => {
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  const room = Rooms.getRoom(gameId);

  if (!room) {
    ws.send(createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${gameId}`));
    return;
  }

  const player = room.players[indexPlayer];
  if (!player) {
    ws.send(createErrorResponse(id, `${ErrorMessages.PLAYER_NOT_FOUND}: ${indexPlayer}`));
    return;
  }

  player.ships = ships.map((ship: Ship) => ({...ship, hits: 0}));

  const allPlayersExist = room.players.length === 2;
  const allPlayersReady = room.players.every((p) => p.ships && p.ships.length > 0);
  if (allPlayersReady && allPlayersExist) {
    startGame(id, room);
  }
}