import { Players } from "../store/players";
import { Hit, Player, Room } from "../types/types";
import { createAttackResponse, createChangeTurnResponse, createFinishResponse } from "./responses";
import { LogMessages, Statuses } from "../constants/constants";
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
        const response = createFinishResponse(id, currentPlayer.index);
        otherPlayer.ws.send(response);
        currentPlayer.ws.send(response);
        console.log(LogMessages.SEND_MESSAGE, response);
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
  const attackResponse = createAttackResponse(id, { x, y }, turn, status);
  const turnResponse = createChangeTurnResponse(id, room.turn);

  currentPlayer.ws.send(attackResponse);
  otherPlayer.ws.send(attackResponse);

  currentPlayer.ws.send(turnResponse);
  otherPlayer.ws.send(turnResponse);

  console.log(LogMessages.SEND_MESSAGE, attackResponse);
  console.log(LogMessages.SEND_MESSAGE, turnResponse);
}