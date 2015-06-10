import Phaser from 'Phaser';
import powerup from 'commands/powerup';
import * as conf from 'conf';

class puck_reverse_powerup extends powerup {
    constructor(players, player) {
        super('puck_reverse_powerup', 'flip');
        this.players = players;
        this.player  = player;
    }

    execute(puck) {
        // reverse the velocity of the puck
        Phaser.Point.negative(this.player.puck.body.velocity, this.player.puck.body.velocity);
    }

    undo() {
        // undo is a noop here
    }

}

export default puck_reverse_powerup;
