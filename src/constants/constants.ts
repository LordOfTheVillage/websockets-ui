export enum MessageTypes {
    REG = 'reg',
    CREATE_ROOM = 'create_room',
    ADD_PLAYER_TO_ROOM = 'add_player_to_room',
    ADD_SHIPS = 'add_ships',
    ATTACK = 'attack',
    RANDOM_ATTACK = 'randomAttack',
};

export enum ResponseTypes  {
    REG = 'reg',
    CREATE_GAME = 'create_game',
    UPDATE_ROOM = 'update_room',
    TURN = 'turn',
    ATTACK = 'attack',
    FINISH =  'finish',
    UPDATE_WINNERS = 'update_winners',
    ERROR = 'error',
};

export enum ErrorMessages {
    PLAYER_EXISTS = 'Player already exists',
    ROOM_NOT_FOUND = 'Room not found',
    PLAYER_NOT_FOUND = 'Player not found',
    NOT_YOUR_TURN = 'Not your turn',
}

export enum Statuses {
    MISS = 'miss',
    SHOT = 'shot',
    KILLED = 'killed',
}
