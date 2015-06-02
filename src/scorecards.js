import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import { toArray } from 'lodash';

let template = pc.template(scorecard_template);
let view;

function create(players) {
    view = template.view({ players: toArray(players) });
    document.querySelector('#game-container').appendChild(view.render());
}

function update() {
    view.accessor.apply();
}

export { create, update };
