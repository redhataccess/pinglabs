import powerup from 'commands/powerup';
import * as conf from 'conf';

class shellshock_powerup extends powerup {
    constructor(player) {
        super('shellshock_powerup');
        this.player = player;
    }

    execute(scale=1) {
        this.player.springiness += conf.KICKSTARTER_MULTIPLIER;
    }

    undo() {
        this.player.springiness = conf.PADDLE_SPRINGINESS_DEFAULT;
    }

}

export default shellshock_powerup;
