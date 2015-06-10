import Phaser from 'Phaser';
import { partial, first, pluck, omit, without, sample, keys } from 'lodash';
import player_start from 'commands/player-start';
import * as powerups from 'commands/powerups/all';
import * as conf from 'conf';

let players = {};

let axes = {
    'x': { pos: 'right', neg: 'left' },
    'y': { pos: 'down', neg: 'up' },
};

class player {
    constructor(name, pad, axis) {
        let axis_dirs    = axes[axis];
        this.name        = name;
        this.color       = conf[`COLOR_PLAYER_${this.name.toUpperCase()}`].toString();
        this.pad         = pad;
        this.playing     = false;
        this.start       = new player_start(this);
        this.score       = undefined;
        this.axis        = axis;
        this.cursed_move = 1; // movement multiplier; can be used for evil
        this.pos         = axis_dirs.pos;
        this.neg         = axis_dirs.neg;
        this.springiness = 1;
        this.reset_default_powerups();
    }

    add_powerup(powerup) {
        this.powerups.push(powerup);
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'name')}]`);
    }

    rotate_powerups() {
        let p = this.powerups.shift();
        if (p) {
            this.powerups.push(p);
        }
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'name')}]`);
    }

    execute_powerup() {
        let powerup = this.powerups.shift();
        if (powerup) {
            powerup.execute();
        }
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'name')}]`);
    }

    add_random_powerup() {
        // get a random powerup name from the powerups object (remove babel's __esModule property)
        let pow_name = sample(without(keys(powerups), '__esModule'));
        this.add_powerup(new powerups[pow_name]( omit(players, this), this));
    }

    reset_default_powerups() {
        this.powerups = [];
        this.add_random_powerup();
        this.add_random_powerup();
        this.add_random_powerup();
    }
}

players.n = new player('n', 'pad4', 'x');
players.s = new player('s', 'pad3', 'x');
players.e = new player('e', 'pad2', 'y');
players.w = new player('w', 'pad1', 'y');

export default players;
