import * as command from 'commands/command';
import * as conf from 'conf';

export default class player_login_choose_name extends command {

    constructor(player) {
        super('player-login-choose-name');
        this.player = player;
        this.prev_state = this.player.state;
    }

    execute() {
        this.player.state = conf.PLAYER_STATE.LOGIN_CHOOSING_NAME;
        console.log(`LOGIN: player ${this.player.name} is choosing name`);
    }

    undo() {
        this.player.state = this.prev_state;
        console.log(`LOGIN: player ${this.player.name} backs out of choosing name`);
    }

    done() {
        console.log(`LOGIN: player ${this.player.name} is done choosing name`);
    }

}

