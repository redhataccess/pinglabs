import { invoke } from 'lodash';
import { STARTING_LIVES, STARTING_SCORE } from 'conf';
import players from 'players';

class score {
    constructor(starting_score, starting_lives, player_name) {
        this.__player_name__    = player_name;
        this.__starting_score__ = starting_score;
        this.score              = starting_score;
        this.el                 = document.querySelector(`#player-${this.__player_name__}-status`);

        this.__starting_lives__ = starting_lives;
        this.lives              = starting_lives;
    }

    reset() {
        this.score = this.__starting_score__;
        this.lives = this.__starting_lives__;
    }

    add_score(amount=1) {
        this.score += amount;

        if (players[this.__player_name__].playing) {
            var event = new CustomEvent('score', {
                'detail': {
                    player: players[this.__player_name__],
                    score: this.score
                }
            });

            document.dispatchEvent(event);
        }

        console.log(`SCORE: ${this.__player_name__} player gains ${this.amount} points, now at ${this.score}`);
    }

    sub_lives(amount=1) {
        let player = players[this.__player_name__];

        this.lives -= amount;
        player.add_random_powerup();

        if (this.dead()) {
            player.reset_default_powerups();
            player.start.undo();
            this.reset();
        }
        console.log(`LIVES: ${this.__player_name__} player loses ${amount} lives, now at ${this.lives} lives`);
    }

    dead() {
        return this.lives <= 0;
    }

}

var scores = {
    n: new score( STARTING_SCORE, STARTING_LIVES, 'n' ),
    s: new score( STARTING_SCORE, STARTING_LIVES, 's' ),
    e: new score( STARTING_SCORE, STARTING_LIVES, 'e' ),
    w: new score( STARTING_SCORE, STARTING_LIVES, 'w' )
};

players.n.score = scores.n;
players.s.score = scores.s;
players.e.score = scores.e;
players.w.score = scores.w;

scores.reset_all = reset_all;

function reset_all() {
    invoke(scores, 'reset');
}

reset_all();

export default scores;
