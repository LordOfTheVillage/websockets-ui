import { Rooms } from '../../store/rooms';
import { createErrorResponse } from '../../utils/responses';
import WebSocket from 'ws';
import { startGame } from '../start_game';
import {
  ErrorMessages,
  LogMessages,
  RoomTypes,
} from '../../constants/constants';
import { Ship } from '../../types/types';

export const addShips = (ws: WebSocket, data: any, id: number) => {
  const { gameId, ships, indexPlayer } = JSON.parse(data);
  const room = Rooms.getRoom(gameId);

  if (!room) {
    const response = createErrorResponse(id, `${ErrorMessages.ROOM_NOT_FOUND}: ${gameId}`);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }

  const player = room.players[indexPlayer];
  if (!player) {
    const response = createErrorResponse(id, `${ErrorMessages.PLAYER_NOT_FOUND}: ${indexPlayer}`);
    ws.send(response);
    console.log(LogMessages.SEND_MESSAGE, response);
    return;
  }

  player.ships = ships.map((ship: Ship) => ({...ship, hits: 0}));

  const allPlayersExist = room.players.length === 2;
  const allPlayersReady = room.players.every((p) => p.ships && p.ships.length > 0);
  if (allPlayersReady && allPlayersExist || room.type === RoomTypes.SINGLE) {
    startGame(id, room);
  }
}