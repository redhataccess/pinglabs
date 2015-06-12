import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import * as leaderboard from 'leaderboard';
import * as conf from 'conf';
import { assign, toArray, range, keys, get, sortBy as sort } from 'lodash';
import { inactive, playing, choosing_letter, choosing_name, logging_in } from 'player-state-checkers';

let template = pc.template(scorecard_template);
let view;
let data = {};

function create(players) {
    data = assign(data, {
        players: toArray(players),
        leaderboard,
        conf,
        range,
        keys,
        'get': get,
        sort
    });
    view = template.view(data);
    document.querySelector('#game-container').appendChild(view.render());
}

function update() {
    data.active_part = leaderboard.player_list_parts[leaderboard.current_letter];
    view.accessor.applyChanges();
}

export { create, update };
