import {ResponseTypes} from "../constants/constants";

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

export const createCreateGameResponse = (id: number, roomId: number, playerId: number) => {
    return JSON.stringify({
        type: ResponseTypes.CREATE_GAME,
        id,
        data: JSON.stringify({
            roomId,
            playerId,
        }),
    });
}