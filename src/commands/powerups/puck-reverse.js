import Phaser from 'Phaser';
import powerup from 'commands/powerup';
import * as conf from 'conf';
import * as puck_history from 'puck-history';

class puck_reverse_powerup extends powerup {
    constructor(players, player) {
        super('puck_reverse_powerup', 'flip');
        this.players = players;
        this.player  = player;
    }

    execute(puck) {
        // reverse the velocity of the puck
        Phaser.Point.negative(this.player.puck.body.velocity, this.player.puck.body.velocity);

        // if a goal is scored 'by' the flip, the player who activated the flip
        // should get credit!
        puck_history.push(this.player.name);
    }

    undo() {
        // undo is a noop here
    }

}

export default puck_reverse_powerup;
