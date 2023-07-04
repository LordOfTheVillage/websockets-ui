import { ResponseTypes, Statuses } from "../constants/constants";

export const createErrorResponse = (id: number, message: string) => {
    return JSON.stringify({
        id,
        type: ResponseTypes.ERROR,
        message,
    });
}

export const createRegistrationResponse = (id: number, name: string, index: number, error: boolean, errorText: string = "") => {
    return JSON.stringify({
        type: ResponseTypes.REG,
        id,
        data: JSON.stringify({
            name,
            index,
            error,
            errorText,
        }),
    });
}

export const createCreateGameResponse = (id: number, idGame: number, idPlayer: number) => {
    return JSON.stringify({
        type: ResponseTypes.CREATE_GAME,
        id,
        data: JSON.stringify({
            idGame,
            idPlayer,
        }),
    });
}

export const createStartGameResponse = () => {
    return JSON.stringify({
        type: ResponseTypes.START_GAME,
    });
}

export const createFinishResponse = (id: number, winPlayer: number) => {
    return JSON.stringify({
        type: ResponseTypes.FINISH,
        id,
        data: JSON.stringify({
            winPlayer,
        }),
    });
}

export const createAttackResponse = (id: number, {x, y}: Record<string, number>, currentPlayer: number, status: Statuses) => {
    return JSON.stringify({
        type: ResponseTypes.ATTACK,
        id,
        data: JSON.stringify({
            position: {
                x,
                y,
            },
            currentPlayer,
            status,
        }),
    });
}

export const createUpdateRoomResponse = (id: number, roomData: any) => {
    return JSON.stringify({
        type: ResponseTypes.UPDATE_ROOM,
        id,
        data: JSON.stringify([...roomData]),
    });
}