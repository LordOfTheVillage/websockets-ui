import WebSocket from "ws";

export interface Room {
    index: number;
    players: Player[];
    turn: number;
}

export interface Player {
    index: number;
    name: string;
    password: string;
    ws: WebSocket;
    ships?: number[];
}