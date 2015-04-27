import Phaser from 'Phaser';
import * as viewport from 'viewport';
import * as conf from 'conf';
import play_state from 'states/play';
import title_state from 'states/title';
import preload_state from 'states/preload';
import score_state from 'states/score';

function init() {
    let game = new Phaser.Game(
        viewport.WIDTH,
        viewport.HEIGHT,
        Phaser.WEBGL,
        conf.NAME
    );
    // game.state.add('boot');
    game.state.add('preload', preload_state);
    game.state.add('title', title_state);
    game.state.add('play', play_state);
    game.state.add('score', score_state);
    game.state.start('preload');
}

export { init };
