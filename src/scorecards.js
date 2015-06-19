import * as pc from 'paperclip';
import * as scorecard_template from 'text!templates/scorecards.html';
import leaderboard from 'leaderboard';
import * as conf from 'conf';
import input from 'input';
import { each, range } from 'lodash';
import { inactive, playing, choosing_letter, choosing_name, logging_in } from 'player-state-checkers';

let template = pc.template(scorecard_template, pc);
let view;
let data;

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
        players: players,
        leaderboard: leaderboard,
        conf,
        range
    };
    view = template.view(data);
    document.querySelector('#game-container').appendChild(view.render());
}

function update() {
    each(['n', 's', 'e', 'w'], function (p) {
        data.players[p].selected_player = leaderboard[p].selected_player;
        data.players[p].current_letter = leaderboard[p].current_letter;
    });
    view.accessor.applyChanges();
}

export { create, update };
