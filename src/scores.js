import { STARTING_LIVES } from 'conf';

var players = {};

function reset() {
    players.n = STARTING_LIVES;
    players.s = STARTING_LIVES;
    players.e = STARTING_LIVES;
    players.w = STARTING_LIVES;
}

reset();

export { players, reset };
