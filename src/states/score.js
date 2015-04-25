import Phaser from 'Phaser';
import scores from 'scores';
import { SCORE_POSITION, TEXT_FONT, TEXT_SIZE } from 'conf';
import state from 'states/state';

export default class score_state extends state {
    constructor() {
        super('score');
    }
    create(game) {
        this.score_text = game.add.bitmapText(SCORE_POSITION.x, SCORE_POSITION.y, TEXT_FONT , '', TEXT_SIZE);
    }

    update(game) {
        this.score_text.setText(`  ${scores.n}\n\n${scores.w}   ${scores.e}\n\n  ${scores.s}`);
    }
}
