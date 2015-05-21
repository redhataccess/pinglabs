import Phaser from 'Phaser';
import { partial } from 'lodash';
import player_start from 'commands/player-start';

let players = {
};

let axes = {
    'x': { pos: 'right', neg: 'left' },
    'y': { pos: 'down', neg: 'up' },
};

class player {
    constructor(name, pad, axis) {
        let axis_dirs = axes[axis];
        this.name    = name;
        this.pad     = pad;
        this.playing = false;
        this.start   = new player_start(this);
        this.axis    = axis;
        this.pos     = axis_dirs.pos;
        this.neg     = axis_dirs.neg;
    }
}

players.n = new player('n', 'pad4', 'x');
players.s = new player('s', 'pad3', 'x');
players.e = new player('e', 'pad2', 'y');
players.w = new player('w', 'pad1', 'y');

export default players;
