import * as scores from 'scores';
import { SCORE_POSITION, TEXT_FONT, TEXT_SIZE } from 'conf';
import state from 'states/state';

function go_to_title_state() {
    this.state.start('title');
}

export default class score_state extends state {
    constructor() {
        super('score');
    }
    create(game) {
        this.score_text = game.add.bitmapText(SCORE_POSITION.x, SCORE_POSITION.y, TEXT_FONT , '', TEXT_SIZE);
        let timer = game.time.create(true);
        timer.add(3500, go_to_title_state, game);
        timer.start();
    }

    update(game) {
        this.score_text.setText(`  ${scores.n}\n\n${scores.w}   ${scores.e}\n\n  ${scores.s}`);
    }
}
