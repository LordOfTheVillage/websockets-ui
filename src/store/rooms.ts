import {Room} from "../types/types";

export class Rooms {
    private static rooms: Room[] = [];

    public static getRoom(id: number): Room | undefined {
        return this.rooms.find(room => room.index === id);
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
}