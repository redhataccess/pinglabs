import * as command from 'commands/command';
import * as conf from 'conf';

/**
 * These are executed when a player presses Start.
 */

class player_start extends command {

    constructor(player) {
        super('player-start');
        this.player = player;
    }

    execute() {
        // I designed the module layout poorly in some places, so a regular
        // import can't be used here for 'scores' due to a circular dependency.
        // Fall back to RequireJS's circular dependency solution of
        // `require('scores')`.
        let score_obj = require('scores')[this.player.name];
        console.log(`JOIN: player ${this.player.name} joined`);
        score_obj.reset();
        score_obj.show_display();
        hide_press_start_prompt(this.player);
        this.player.playing = true;
    }

    undo() {
        // I designed the module layout poorly in some places, so a regular
        // import can't be used here for 'scores' due to a circular dependency.
        // Fall back to RequireJS's circular dependency solution of
        // `require('scores')`.
        let score_obj = require('scores')[this.player.name];
        console.log(`JOIN: player ${this.player.name} left`);
        score_obj.reset();
        score_obj.hide_display();
        show_press_start_prompt(this.player);
        this.player.playing = false;
    }

}

function hide_press_start_prompt(player) {
    let el = document.querySelector(`#player-${player.name}-status .press-start`);
    el.classList.add('hide');
}

function show_press_start_prompt(player) {
    let el = document.querySelector(`#player-${player.name}-status .press-start`);
    el.classList.remove('hide');
}

export default player_start;
