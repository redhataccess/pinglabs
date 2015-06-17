import * as command from 'commands/command';
import * as conf from 'conf';
import * as leaderboard from 'leaderboard';
import { findKey } from 'lodash';
import players from 'players';
import * as powerups from 'commands/powerups/all';

let powerupHash = {
    kickstart: 'kickstarter',
    security: 'shellshock',
    samba: 'puck_reverse'
};

function add_powerups(player, powerup, number) {
    let i = 0;

    for (i; i < number; i += 1) {
        player.add_powerup(powerup);
    }
}

export default class player_login_choose_name extends command {

    constructor(player) {
        super('player-login-choose-name');
        this.player = player;
        this.prev_state = this.player.state;
    }

    execute() {
        console.log(`LOGIN: player ${this.player.name} is choosing name`);
        this.player.state = conf.PLAYER_STATE.LOGIN_CHOOSING_NAME;
    }

    undo() {
        console.log(`LOGIN: player ${this.player.name} backs out of choosing name, now choosing letter`);
        this.player.state = conf.PLAYER_STATE.LOGIN_CHOOSING_LETTER;
    }

    done() {
        console.log(`LOGIN: player ${this.player.name} is done choosing name`);
        this.player.id = findKey(leaderboard.player_list, leaderboard[this.player.name].selected_player);

        /*
         * assign powerups here. the player is assigned as many powerups
         * as the games object specifies for each key
         *
         * kickstart = kick (kickstarter)
         * security = hack (shellshock)
         * samba = flip (puck_reverse)
         */
        this.player.powerups = [];

        if (leaderboard[this.player.name].selected_player.games) {
            for (let key of Object.keys(leaderboard[this.player.name].selected_player.games)) {
                let number = leaderboard[this.player.name].selected_player.games[key];
                add_powerups(this.player, powerupHash[key], number);
            }
        }

        this.player.play.execute();
    }

}
