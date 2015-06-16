import Phaser from 'Phaser';
import { partial, first, pluck, omit, without, sample, keys } from 'lodash';
import player_play from 'commands/player-play';
import player_login_choose_letter from 'commands/player-login-choose-letter';
import player_login_choose_name from 'commands/player-login-choose-name';
import * as powerups from 'commands/powerups/all';
import * as conf from 'conf';

let players = {};

let axes = {
    'x': { pos: 'right', neg: 'left' },
    'y': { pos: 'down', neg: 'up' },
};

class player {
    constructor(name, pad, axis) {
        let axis_dirs      = axes[axis];
        this.name          = name;
        this.id            = '';
        this.color         = conf[`COLOR_PLAYER_${this.name.toUpperCase()}`].toString();
        this.pad           = pad;
        this.state         = conf.PLAYER_STATE.INACTIVE;
        this.play          = new player_play(this);
        this.choose_letter = new player_login_choose_letter(this);
        this.choose_name   = new player_login_choose_name(this);
        this.score         = undefined;
        this.axis          = axis;
        this.cursed_move   = 1; // movement multiplier; can be used for evil
        this.pos           = axis_dirs.pos;
        this.neg           = axis_dirs.neg;
        this.springiness   = 1;
        this.reset_default_powerups();
    }

    add_powerup(powerup_name) {
        let powerup = new powerups[powerup_name]( omit(players, this), this);
        this.powerups.push(powerup);
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'shortname')}]`);
    }

    rotate_powerups() {
        let p = this.powerups.shift();
        if (p) {
            this.powerups.push(p);
        }
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'shortname')}]`);
    }

    execute_powerup() {
        let powerup = this.powerups.shift();
        if (powerup) {
            powerup.execute();
        }
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'shortname')}]`);
    }

    add_random_powerup() {
        // get a random powerup name from the powerups object (remove babel's __esModule property)
        let pow_name = sample(without(keys(powerups), '__esModule'));
        this.add_powerup(pow_name);
    }

    reset_default_powerups() {
        this.powerups = [];
    }
}

players.n = new player('n', 'pad4', 'x');
players.s = new player('s', 'pad3', 'x');
players.e = new player('e', 'pad2', 'y');
players.w = new player('w', 'pad1', 'y');

export default players;
