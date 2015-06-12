import * as command from 'commands/command';
import * as conf from 'conf';
import * as leaderboard from 'leaderboard';
import { findKey } from 'lodash';

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
        this.player.play.execute();
    }

}
