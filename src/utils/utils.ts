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
        data: {
            name,
            index,
            error,
            errorText,
        },
    });
}
