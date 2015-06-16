import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import leaderboard from 'leaderboard';
import * as conf from 'conf';
import input from 'input';
import { pick, each, assign, toArray, range, keys, get, sortBy as sort } from 'lodash';
import { inactive, playing, choosing_letter, choosing_name, logging_in } from 'player-state-checkers';

let template = pc.template(scorecard_template, pc);
let view;
let data;

// players-leaderboard-merge is a single object with n-s-e-w combined.
// paperclip seems to have trouble with dirty checking separate objects within
// the same element/component.
let plm = {};

let PlayerUI = pc.Component.extend({
    initialize: function () {
        console.log(`init LetterPicker`);
    },
    update: function () {
        console.log(`updating LetterPicker`);
    }
});

pc.components.playerui = PlayerUI;

function create(players) {
    data = {
        players: plm,
        conf,
        range,
        keys,
        'get': get,
        sort
    };
    view = template.view(data);
    document.querySelector('#game-container').appendChild(view.render());
}

function update(players) {
    each(['n', 's', 'e', 'w'], function (p) {
        plm[p] = assign({}, players[p], leaderboard[p]);
    });
    view.accessor.applyChanges();
}

export { create, update };
