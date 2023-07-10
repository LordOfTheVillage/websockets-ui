import { Rooms } from '../../store/rooms';
import { Players } from '../../store/players';
import WebSocket from 'ws';
import { createCreateGameResponse } from '../../utils/responses';
import { LogMessages, RoomTypes } from '../../constants/constants';

export const createRoom = (
  ws: WebSocket,
  id: number,
  type: RoomTypes = RoomTypes.MULTI,
) => {
  const room = Rooms.createRoom(type);
  const player = Players.getPlayerByWs(ws);

  if (player) {
    Rooms.addPlayerToRoom(room.index, { ...player });
  }
  const response = createCreateGameResponse(id, room.index, player?.index || 0);
  ws.send(response);
  console.log(LogMessages.SEND_MESSAGE, response);
};