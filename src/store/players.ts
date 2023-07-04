import {Player} from "../types/types";
import WebSocket from "ws";

export class Players {
    private static players: Player[] = [];
    public static getPlayer(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }

    public static getPlayerByWs(ws: WebSocket): Player | undefined {
        return this.players.find(player => player.ws === ws);
    }

    public static addPlayer(playerData: Omit<Player, "index">): void {
        const index = this.players.length;
        const player = { ...playerData, index };
        this.players.push(player);
    }
    public static removePlayer(name: string): void {
        this.players = this.players.filter(player => player.name !== name);
    }
    public static getPlayers(): Player[] {
        return this.players;
    }
}