import { broadcastResponse } from "../../websocket_server";
import { Players } from "../../store/players";
import { createUpdateWinnersResponse } from "../../utils/responses";
import { LogMessages } from "../../constants/constants";

export const updateWinners = (id: number) => {
  const scoreTable = Players.getPlayers().map((player) => ({
    name: player.name,
    wins: player.wins,
  }));

  const response = createUpdateWinnersResponse(id, scoreTable);
  console.log(LogMessages.SEND_MESSAGE, response)
  broadcastResponse(response);
}