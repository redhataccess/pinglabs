import Phaser from 'Phaser';
import { partial, first, pluck, omit } from 'lodash';
import player_start from 'commands/player-start';
import * as powerups from 'commands/powerups/all';

let players = {};

let axes = {
    'x': { pos: 'right', neg: 'left' },
    'y': { pos: 'down', neg: 'up' },
};

class player {
    constructor(name, pad, axis) {
        let axis_dirs    = axes[axis];
        this.name        = name;
        this.pad         = pad;
        this.playing     = false;
        this.start       = new player_start(this);
        this.score       = undefined;
        this.axis        = axis;
        this.cursed_move = 1; // movement multiplier; can be used for evil
        this.pos         = axis_dirs.pos;
        this.neg         = axis_dirs.neg;
        this.springiness = 1;
        this.powerups    = [];
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

    reset_default_powerups() {
        this.add_powerup(new powerups.shellshock( omit(players, this), this ));
        this.add_powerup(new powerups.kickstarter( omit(players, this), this ));
        this.add_powerup(new powerups.shellshock( omit(players, this), this ));
    }
}

players.n = new player('n', 'pad4', 'x');
players.s = new player('s', 'pad3', 'x');
players.e = new player('e', 'pad2', 'y');
players.w = new player('w', 'pad1', 'y');

export default players;
