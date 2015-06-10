import { each, partial, set, delay, bind } from 'lodash';
import powerup from 'commands/powerup';
import * as conf from 'conf';

const _ = partial.placeholder;

class shellshock_powerup extends powerup {
    constructor(players, player) {
        super('shellshock_powerup', 'hack');
        this.players = players;
        this.player  = player;
    }

    execute() {
        // curse all players
        each( this.players, partial( set, _, 'cursed_move', conf.CURSED_VALUE ) );
        // uncurse the player who cast shellshock :)
        this.player.cursed_move = conf.UNCURSED_VALUE;
        delay(bind(this.undo, this), conf.CURSED_DURATION);
    }

    undo() {
        // uncurse all players
        each( this.players, partial( set, _, 'cursed_move', conf.UNCURSED_VALUE ) );
    }

}

export default shellshock_powerup;
