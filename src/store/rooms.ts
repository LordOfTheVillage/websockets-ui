import {Room} from "../types/types";

export class Rooms {
    private static rooms: Room[] = [];

    public static getRoom(id: string): Room | undefined {
        return this.rooms.find(room => room.id === id);
    }

    public static addRoom(room: Room): void {
        this.rooms.push(room);
    }

    public static removeRoom(id: string): void {
        this.rooms = this.rooms.filter(room => room.id !== id);
    }

    public static getRooms(): Room[] {
        return this.rooms;
    }
}