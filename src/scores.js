import { invoke } from 'lodash';
import { STARTING_LIVES, STARTING_SCORE } from 'conf';
import score_display from 'commands/player-score-display';
import lives_display from 'commands/player-lives-display';
import players from 'players';

class score {
    constructor(starting_score, starting_lives, player_name) {
        this.__player_name__    = player_name;
        this.__starting_score__ = starting_score;
        this.score              = starting_score;
        this.el                 = document.querySelector(`#player-${this.__player_name__}-status`);

        this.__starting_lives__ = starting_lives;
        this.lives              = starting_lives;
        this.__score_display__  = new score_display(this.__player_name__);
        this.__lives_display__  = new lives_display(this.__player_name__);
        this.update_display();
    }

    reset() {
        this.score = this.__starting_score__;
        this.lives = this.__starting_lives__;
        this.update_display();
    }

    add_score(amount=1) {
        this.score += amount;
        this.update_display();
        console.log(`SCORE: ${this.__player_name__} player gains ${this.amount} points, now at ${this.score}`);
    }

    sub_lives(amount=1) {
        this.lives -= amount;
        this.update_display();
        if (this.dead()) {
            let player = players[this.__player_name__];
            player.reset_default_powerups();
            player.start.undo();
            this.reset();
        }
        console.log(`LIVES: ${this.__player_name__} player loses ${amount} lives, now at ${this.lives} lives`);
    }

    dead() {
        return this.lives <= 0;
    }

    update_display() {
        this.__score_display__.execute(this.score);
        this.__lives_display__.execute(this.lives);
    }

    hide_display() {
        this.el.classList.remove('playing');
    }

    show_display() {
        this.el.classList.add('playing');
    }
}

var scores = {
    n: new score( STARTING_SCORE, STARTING_LIVES, 'n' ),
    s: new score( STARTING_SCORE, STARTING_LIVES, 's' ),
    e: new score( STARTING_SCORE, STARTING_LIVES, 'e' ),
    w: new score( STARTING_SCORE, STARTING_LIVES, 'w' )
};

scores.reset_all = reset_all;

function reset_all() {
    invoke(scores, 'reset');
}

reset_all();

export default scores;
