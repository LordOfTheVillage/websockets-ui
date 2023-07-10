import { Player, Room } from "../types/types";
import { RoomTypes } from "../constants/constants";

export class Rooms {
    private static rooms: Room[] = [];

    public static getRoom(id: number): Room | undefined {
        return this.rooms.find(room => room.index === id);
    }

    public static createRoom(type: RoomTypes): Room {
        const roomId = Rooms.rooms.length;
        const newRoom = { index: roomId, players: [], turn: 0, type };
        Rooms.rooms.push(newRoom);
        return newRoom;
    }

    public static addPlayerToRoom(roomIndex: number, player: Player): void {
        const room = Rooms.getRoom(roomIndex);
        if (room) {
            room.players.push(player);
        }
    }

    public static addRoom(room: Room): void {
        this.rooms.push(room);
    }

    public static removeRoom(id: number): void {
        this.rooms = this.rooms.filter(room => room.index !== id);
    }

    public static getRooms(): Room[] {
        return this.rooms;
    }

    public static getRoomByPlayerIndex(index: number): Room | undefined {
        return this.rooms.find(room => room.players.some(player => player.index === index));
    }
}