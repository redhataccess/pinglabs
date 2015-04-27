import * as conf from 'conf';
import state from 'states/state';

export default class title_state extends state {
    constructor() {
        super('title');
    }
    create(game) {
        this.title_text = game.add.bitmapText(
            conf.SCORE_POSITION.x,
            conf.SCORE_POSITION.y,
            conf.TEXT_FONT ,
            '',
            conf.TEXT_SIZE
        );
    }

    update(game) {
        this.title_text.setText(`PING LABS`);
        //let timer = game.time.create(true);
        //timer.add(conf.TITLE_FADE_IN, 
        game.state.start('play');
    }
}
