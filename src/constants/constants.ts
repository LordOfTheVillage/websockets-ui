export const MessageTypes = {
    REG: 'reg',
    CREATE_ROOM: 'create_room',
    ADD_PLAYER_TO_ROOM: 'add_player_to_room',
    ADD_SHIPS: 'add_ships',
    ATTACK: 'attack',
    RANDOM_ATTACK: 'randomAttack',
};

export const ResponseTypes = {
    REG: 'reg',
    CREATE_GAME: 'create_game',
    UPDATE_ROOM: 'update_room',
    TURN: 'turn',
    ATTACK: 'attack',
    FINISH: 'finish',
    UPDATE_WINNERS: 'update_winners',
    ERROR: 'error',
};

export const ErrorMessages = {
    PLAYER_EXISTS: 'Player already exists',
}
