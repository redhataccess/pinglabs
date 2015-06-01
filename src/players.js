import Phaser from 'Phaser';
import { partial, first, pluck } from 'lodash';
import player_start from 'commands/player-start';
import kickstarter_powerup from 'commands/kickstarter-powerup';

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
        this.axis        = axis;
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
        this.powerups.push(this.powerups.shift());
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
        this.add_powerup(new kickstarter_powerup(this));
        this.add_powerup(new kickstarter_powerup(this));
        this.add_powerup(new kickstarter_powerup(this));
    }
}

players.n = new player('n', 'pad4', 'x');
players.s = new player('s', 'pad3', 'x');
players.e = new player('e', 'pad2', 'y');
players.w = new player('w', 'pad1', 'y');

export default players;
