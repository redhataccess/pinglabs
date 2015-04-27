import state from 'states/state';
import SOUNDS from 'sounds';

export default class preload_state extends state {
    constructor() {
        super('preload');
    }
    preload(game) {
        game.load.image('puck', 'assets/sprites/puck.png');
        game.load.image('paddle', 'assets/sprites/paddle.png');
        game.load.image('paddle-red', 'assets/sprites/paddle-red.png');
        game.load.image('paddle-green', 'assets/sprites/paddle-green.png');
        game.load.image('paddle-blue', 'assets/sprites/paddle-blue.png');
        game.load.image('paddle-yellow', 'assets/sprites/paddle-yellow.png');
        game.load.audio('puck-hit-paddle', 'assets/sounds/puck-hit-paddle.ogg');
        game.load.audio('puck-oob', 'assets/sounds/puck-oob.mp3');
        game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
    }
    create(game) {
        SOUNDS.PUCK_HIT_PADDLE = game.add.audio('puck-hit-paddle');
        SOUNDS.PUCK_HIT_PADDLE.allowMultiple = true;
        SOUNDS.PUCK_OOB = game.add.audio('puck-oob');

        game.state.start('title');
    }
}
