import Phaser from 'Phaser';
import { pull, countBy, find, partial, mapValues, range, sortBy as sort, unique, first, pluck, omit, without, sample, keys } from 'lodash';
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
        let axis_dirs                   = axes[axis];
        this.name                       = name;
        this.id                         = '';
        this.color                      = conf[`COLOR_PLAYER_${this.name.toUpperCase()}`].toString();
        this.pad                        = pad;
        this.state                      = conf.PLAYER_STATE.INACTIVE;
        this.play                       = new player_play(this);
        this.choose_letter              = new player_login_choose_letter(this);
        this.choose_name                = new player_login_choose_name(this);
        this.score                      = undefined;
        this.axis                       = axis;
        this.cursed_move                = 1; // movement multiplier; can be used for evil
        this.pos                        = axis_dirs.pos;
        this.neg                        = axis_dirs.neg;
        this.springiness                = 1;
        this.powerup_counts             = {};
        this.powerup_count_arrs         = {};
        this.powerups_shortnames        = [];
        this.selected_powerup_index     = 0;
        this.selected_powerup_shortname = '';
        this.update_powerups_meta();
        this.reset_default_powerups();
    }

    update_powerups_meta() {
        this.powerups_shortnames        = unique(sort(pluck(this.powerups, 'shortname')), true);
        this.powerup_counts             = countBy(this.powerups, 'shortname');
        this.powerup_count_arrs         = mapValues(this.powerup_counts, range);
        this.selected_powerup_shortname = this.powerups_shortnames[this.selected_powerup_index];
        this.selected_powerup           = find(this.powerups, (p) => p.shortname === this.selected_powerup_shortname);
    }

    add_powerup(powerup_name) {
        let powerup = new powerups[powerup_name]( omit(players, this), this);
        this.powerups.push(powerup);
        this.update_powerups_meta();
        console.log(`POWERUPS: ${this.name} has [${pluck(this.powerups, 'shortname')}]`);
    }

    rotate_powerups() {
        if (this.powerups.length) {
            this.selected_powerup_index += 1;
            this.selected_powerup_index %= this.powerups_shortnames.length;
            this.update_powerups_meta();
            console.log(`POWERUPS: ${this.name} has selected ${this.selected_powerup.shortname}`);
        }
    }

    execute_powerup() {
        if (this.selected_powerup) {
            this.selected_powerup.execute();
            console.log(`POWERUPS: ${this.name} used [${this.selected_powerup.shortname}]`);
            pull(this.powerups, this.selected_powerup);
            this.update_powerups_meta();
            // if we just used the last of a certain type of powerup, call rotate
            // so the next powerup type can become selected
            if (this.powerup_counts[this.selected_powerup_shortname] === 0) {
                this.rotate_powerups();
            }
        }
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
