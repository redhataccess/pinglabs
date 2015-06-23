import Phaser from 'Phaser';
import { pick, each, partial, set, delay, bind } from 'lodash';
import powerup from 'commands/powerup';
import * as conf from 'conf';

const _ = partial.placeholder;

class shellshock_powerup extends powerup {
    constructor(players, player) {
        super('shellshock_powerup', 'hack');
        this.players = players;
        this.player  = player;
    }

    execute(game) {
        // curse all players
        each( this.players, partial( set, _, 'cursed_move', conf.CURSED_VALUE ) );
        // uncurse the player who cast shellshock :)
        delay(partial(curse, this.player), conf.CURSED_DELAY_MS);
        delay(bind(this.undo, this), conf.CURSED_DURATION_MS);

        // lighten up the background a bit for fun :)
        let tween = game.add.tween(conf.BG_COLOR_CURRENT)
        .to(
            pick(conf.BG_COLOR_PUCK_PADDLE_HIT, conf.COLOR_TWEEN_PROPS),
            conf.CURSED_DELAY_MS,
            Phaser.Easing.Linear.None
        )
        .to(
            pick(conf.BG_COLOR_BASE, conf.COLOR_TWEEN_PROPS),
            conf.CURSED_DURATION_MS,
            Phaser.Easing.Linear.None
        )
        .start();
    }

    undo() {
        // uncurse all players
        each( this.players, partial( set, _, 'cursed_move', conf.UNCURSED_VALUE ) );
    }

}

function curse(player) {
    player.cursed_move = conf.UNCURSED_VALUE;
}

export default shellshock_powerup;
