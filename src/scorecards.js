import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import * as leaderboard from 'leaderboard';
import * as conf from 'conf';
import { toArray, range, keys, get, sortBy as sort } from 'lodash';
import { inactive, playing, choosing_letter, choosing_name, logging_in } from 'player-state-checkers';

let template = pc.template(scorecard_template);
let view;

function create(players) {
    view = template.view({
        players           : toArray(players),
        player_list       : leaderboard.player_list,
        player_list_parts : leaderboard.player_list_parts,
        selected_player   : leaderboard.selected_player,
        conf,
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
