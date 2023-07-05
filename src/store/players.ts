import { Hit, Player } from "../types/types";
import WebSocket from "ws";

export class Players {
    private static players: Player[] = [];
    public static getPlayer(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }

    public static getPlayerByWs(ws: WebSocket): Player | undefined {
        return this.players.find(player => player.ws === ws);
    }

    public static addPlayer(playerData: Omit<Player, "index" | "hits">): void {
        const index = this.players.length;
        const hits: Hit[] = [];
        const player = { ...playerData, hits, index };
        this.players.push(player);
    }

    public static isFieldHit(x: number, y: number, player: Player) {
        return player.hits.find((hit) => hit.x === x && hit.y === y) !== undefined;
    }

    public static markFieldAsHit(x: number, y: number, player: Player) {
        player.hits.push({ x, y });
    }

    public static removePlayer(name: string): void {
        this.players = this.players.filter(player => player.name !== name);
    }
    public static getPlayers(): Player[] {
        return this.players;
    }
}