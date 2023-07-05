import { broadcastResponse } from "../../websocket_server";
import { Players } from "../../store/players";
import { createUpdateWinnersResponse } from "../../utils/responses";

export const updateWinners = (id: number) => {
  const scoreTable = Players.getPlayers().map((player) => ({
    name: player.name,
    wins: player.wins,
  }));

  const response = createUpdateWinnersResponse(id, scoreTable);
  broadcastResponse(response);
}