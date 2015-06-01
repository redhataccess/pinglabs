import * as pc from 'paperclip';
import * as readout_template from 'text!templates/readout.html';
import { toArray } from 'lodash';

let template = pc.template(readout_template);
let view;

function create(players) {
    view = template.view({ players: toArray(players) });
    document.querySelector('#game-container').appendChild(view.render());
}

function update() {
    view.accessor.apply();
}

export { create, update };
