import * as command from 'commands/command';
import * as conf from 'conf';

/**
 * These are executed to update the lives readout.
 */

class player_lives_display extends command {

    constructor(player_name) {
        super('player-lives-display');
        this.player_name = player_name;
        this.el = document.querySelector(`#player-${this.player_name}-status .lives`);
    }

    execute(lives) {
        // display lives, or empty string when lives hits 0
        this.el.innerHTML = lives;
    }

}

export default player_lives_display;
