import * as conf from 'conf';
import state from 'states/state';

function go_to_play_state() {
    this.state.start('play');
}

export default class title_state extends state {
    constructor() {
        super('title');
    }
    create(game) {
        this.title_text = game.add.bitmapText(
            conf.TITLE_POSITION.x,
            conf.TITLE_POSITION.y,
            conf.TEXT_FONT,
            '',
            conf.TEXT_SIZE
        );
        let timer = game.time.create(true);
        timer.add(200, go_to_play_state, game);
        timer.start();
    }

    update(game) {
        this.title_text.setText(`PING\n  LABS`);
        //let timer = game.time.create(true);
        //timer.add(conf.TITLE_FADE_IN, 
    }
}
