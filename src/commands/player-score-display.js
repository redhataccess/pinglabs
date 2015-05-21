import * as command from 'commands/command';
import * as conf from 'conf';

/**
 * These are executed to update the score readout.
 */

class player_score_display extends command {

    constructor(player_name) {
        super('player-score-display');
        this.player_name = player_name;
        this.el = document.querySelector(`#player-${this.player_name}-status .score`);
    }

    execute(score) {
        this.el.innerHTML = score;
    }
}

export default player_score_display;
