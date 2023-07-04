import { Rooms } from "../../store/rooms";
import { createErrorResponse } from "../../utils/utils";
import WebSocket from "ws";
import { startGame } from "../start_game";

export const addShips = (ws: WebSocket, data: any, id: number) => {
  const { gameId, ships, indexPlayer } = data.data;
  const room = Rooms.getRoom(gameId);

  if (!room) {
    ws.send(createErrorResponse(id, `Room not found for game ID: ${gameId}`));
    return;
  }

  const player = room.players[indexPlayer];
  if (!player) {
    ws.send(createErrorResponse(id, `Player not found for index: ${indexPlayer}`));
    return;
  }

  player.ships = ships;

  const allPlayersReady = room.players.every((p) => p.ships && p.ships.length > 0);
  if (allPlayersReady) {
    startGame(room);
  }
}