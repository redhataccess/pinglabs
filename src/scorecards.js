import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import * as leaderboard from 'leaderboard';
import { toArray, range, keys, get, sortBy as sort } from 'lodash';

let template = pc.template(scorecard_template);
let view;

function create(players) {
    view = template.view({
        players           : toArray(players),
        player_list       : leaderboard.player_list,
        player_list_parts : leaderboard.player_list_parts,
        range,
        keys,
        'get': get,
        sort
    });
    document.querySelector('#game-container').appendChild(view.render());
}

function update() {
    view.accessor.apply();
}

export { create, update };
