import * as command from 'commands/command';
import * as conf from 'conf';

/**
 * These are executed when a player presses Start.
 */

class player_log_in extends command {

    constructor(player) {
        super('player-log-in');
        this.player = player;
    }

    execute() {
        this.player.logging_in = true;
    }

    undo() {
        this.player.logging_in = false;
    }

}

export default player_log_in;
