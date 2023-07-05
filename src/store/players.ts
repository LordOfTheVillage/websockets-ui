import { Hit, Player, Ship } from "../types/types";
import WebSocket from "ws";

export class Players {
    private static players: Player[] = [];
    public static getPlayer(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }

    public static getPlayerByWs(ws: WebSocket): Player | undefined {
        return this.players.find(player => player.ws === ws);
    }

    public static addPlayer(playerData: Omit<Player, "index" | "hits" | "wins">): void {
        const index = this.players.length;
        const hits: Hit[] = [];
        const wins = 0;
        const player = { ...playerData, hits, index, wins };
        this.players.push(player);
    }

    public static isFieldHit(x: number, y: number, player: Player) {
        return player.hits.find((hit) => hit.x === x && hit.y === y) !== undefined;
    }

    public static markFieldAsHit(x: number, y: number, player: Player) {
        player.hits.push({ x, y });
    }

    public static isShipHit(x: number, y: number, player: Player) {
        return player.ships!.find((ship) => {
            if (!ship.direction) {
                return ship.position.y === y && x >= ship.position.x && x < ship.position.x + ship.length;
            } else {
                return ship.position.x === x && y >= ship.position.y && y < ship.position.y + ship.length;
            }
        });
    }

    public static markSurroundingFieldsAsHit(hitShip: Ship, player: Player) {
        const { position, direction, length } = hitShip;
        const { x, y } = position;
        const startX = direction ? x - 1 : x - 1;
        const startY = direction ? y - 1 : y - 1;
        const endX = direction ? x + length : x + 1;
        const endY = direction ? y + 1 : y + length;
        for (let i = startX; i <= endX; i++) {
            for (let j = startY; j <= endY; j++) {
                if (i >= 0 && i < 10 && j >= 0 && j < 10) {
                    this.markFieldAsHit(i, j, player);
                }
            }
        }
    }

    public static removePlayer(name: string): void {
        this.players = this.players.filter(player => player.name !== name);
    }
    public static getPlayers(): Player[] {
        return this.players;
    }
}