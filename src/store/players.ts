import {Player} from "../types/types";

export class Players {
    private static players: Player[] = [];
    public static getPlayer(name: string): Player | undefined {
        return this.players.find(player => player.name === name);
    }
    public static addPlayer(player: Player): void {
        this.players.push(player);
    }
    public static removePlayer(name: string): void {
        this.players = this.players.filter(player => player.name !== name);
    }
    public static getPlayers(): Player[] {
        return this.players;
    }
}