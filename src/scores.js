import { invoke } from 'lodash';
import { STARTING_LIVES, STARTING_SCORE } from 'conf';
import score_display from 'commands/player-score-display';
import lives_display from 'commands/player-lives-display';

class score {
    constructor(starting_score, starting_lives, player_name) {
        this.__player_name__    = player_name;
        this.__starting_score__ = starting_score;
        this.score              = starting_score;

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
        console.log(`LIVES: ${this.__player_name__} player loses ${amount} lives, now at ${this.lives} lives`);
    }

    dead() {
        return this.lives <= 0;
    }

    update_display() {
        this.__score_display__.execute(this.score);
        this.__lives_display__.execute(this.lives);
        if (this.dead()) {
            this.__lives_display__.undo();
        }
    }
}

var players = {};

players.n = new score( STARTING_SCORE, STARTING_LIVES, 'n' );
players.s = new score( STARTING_SCORE, STARTING_LIVES, 's' );
players.e = new score( STARTING_SCORE, STARTING_LIVES, 'e' );
players.w = new score( STARTING_SCORE, STARTING_LIVES, 'w' );

function reset_all() {
    invoke(players, 'reset');
}

reset_all();

export { players, reset_all };
