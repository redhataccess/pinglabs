import powerup from 'commands/powerup';
import * as conf from 'conf';

class kickstarter_powerup extends powerup {
    constructor(players, player) {
        super('kickstarter_powerup', 'kick');
        this.player = player;
    }

    execute(scale=1) {
        this.player.springiness += conf.KICKSTARTER_MULTIPLIER;
    }

    undo() {
        this.player.springiness = conf.PADDLE_SPRINGINESS_DEFAULT;
    }

}

export default kickstarter_powerup;
