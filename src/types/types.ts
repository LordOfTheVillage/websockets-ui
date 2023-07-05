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
    ships?: Ship[];
    hits: Hit[];
    wins: number;
}

export interface Ship {
    position: {
        x: number,
        y: number,
    },
    direction: boolean,
    length: number,
    type: "small" | "medium" | "large" | "huge",
    hits: number,
}

export interface Hit {
    x: number,
    y: number,
}
