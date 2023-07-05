import { Players } from "../store/players";
import { Hit, Player, Room } from "../types/types";
import { createAttackResponse, createChangeTurnResponse, createFinishResponse } from "./responses";
import { Statuses } from "../constants/constants";
import { updateWinners } from "../modules/update_winners";

export const getRandomField = (player: Player) => {

  while (true) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    if (!Players.isFieldHit(x, y, player)) {
      return { x, y };
    }
  }
}

export const attackAction = (currentPlayer: Player, otherPlayer: Player, room: Room, id: number, coordinates: Hit) => {
  const { x, y } = coordinates;
  Players.markFieldAsHit(x, y, otherPlayer);

  const turn = room.turn;
  let status = Statuses.MISS;

  const hitShip = Players.isShipHit(x, y, otherPlayer);

  if (hitShip) {
    hitShip.hits++;
    if (hitShip.hits === hitShip.length) {
      status = Statuses.KILLED;
      otherPlayer.ships = otherPlayer.ships!.filter((ship) => ship !== hitShip);
      if (otherPlayer.ships.length === 0) {
        otherPlayer.ws.send(createFinishResponse(id, currentPlayer.index));
        currentPlayer.ws.send(createFinishResponse(id, currentPlayer.index));
        Players.getPlayerByWs(currentPlayer.ws)!.wins++;
        updateWinners(id);
        return;
      }
    } else {
      status = Statuses.SHOT;
    }

  } else {
    room.turn = otherPlayer.index;
  }

  currentPlayer.ws.send(createAttackResponse(id, { x, y }, turn, status));
  otherPlayer.ws.send(createAttackResponse(id, { x, y }, turn, status));

  currentPlayer.ws.send(createChangeTurnResponse(id, room.turn));
  otherPlayer.ws.send(createChangeTurnResponse(id, room.turn));
}