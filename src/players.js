import Phaser from 'Phaser';
import { partial } from 'lodash';
import player_start from 'commands/player-start';

let players = {
};

class player {
    constructor(name, pad, pos, neg) {
        this.name    = name;
        this.pad     = pad;
        this.playing = false;
        this.start   = new player_start(this);
        this.pos     = pos;
        this.neg     = neg;
    }
}

players.n = new player('n', 'pad4', 'right', 'left');
players.s = new player('s', 'pad3', 'right', 'left');
players.e = new player('e', 'pad2', 'down', 'up');
players.w = new player('w', 'pad1', 'down', 'up');

export default players;
