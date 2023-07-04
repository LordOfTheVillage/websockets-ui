export interface Room {
    id: string;
    players: Player[];
    turn: number;
}

export interface Player {
    name: string;
    password: string;
    ws: WebSocket;
}