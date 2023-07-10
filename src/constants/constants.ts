export enum MessageTypes {
    REG = 'reg',
    CREATE_ROOM = 'create_room',
    ADD_PLAYER_TO_ROOM = 'add_user_to_room',
    ADD_SHIPS = 'add_ships',
    ATTACK = 'attack',
    RANDOM_ATTACK = 'randomAttack',
    SINGLE_PLAY = 'single_play',
}

export enum ResponseTypes  {
    REG = 'reg',
    CREATE_GAME = 'create_game',
    UPDATE_ROOM = 'update_room',
    START_GAME = 'start_game',
    TURN = 'turn',
    ATTACK = 'attack',
    FINISH =  'finish',
    UPDATE_WINNERS = 'update_winners',
    ERROR = 'error',
}

export enum ErrorMessages {
    PLAYER_EXISTS = 'Player already exists',
    ROOM_NOT_FOUND = 'Room not found',
    PLAYER_NOT_FOUND = 'Player not found',
    NOT_YOUR_TURN = 'Not your turn',
    TARGET_FIELD_IS_HIT = 'Target field is already hit',
    INVALID_MESSAGE_TYPE = 'Invalid message type',
}

export enum LogMessages {
    PLAYER_CONNECTED = 'WebSocket connection established',
    PLAYER_DISCONNECTED = 'WebSocket connection closed',
    SEND_MESSAGE = 'Send message: ',
    RECEIVE_MESSAGE = 'Receive message: ',
}

export enum Statuses {
    MISS = 'miss',
    SHOT = 'shot',
    KILLED = 'killed',
}


export enum RoomTypes {
    SINGLE = 'single',
    MULTI = 'multi',
}
