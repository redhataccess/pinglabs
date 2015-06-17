/**
 * Confusingly, this module both posts data to the leaderboard when a player
 * scores, AND fetches player names from the leaderboard so new players may
 * select their "account".
 */

import { each, chunk, groupBy, first, sortBy as sort, keys, without, indexOf, get } from 'lodash';
import * as conf from 'conf';
import players from 'players';

let board = {};

// const alpha_chunks = chunk(alphabet, conf.LOGIN_ALPHABET_CHUNK_SIZE);

board.player_list          = {};
board.player_list_parts    = {};
board.alphabet = 'abcdefghijklmnopqrstuvwxyz';

reset_player_selections('n');
reset_player_selections('s');
reset_player_selections('e');
reset_player_selections('w');

function reset_player_selections(playername) {
    board[playername] = {
        selected_player      : {},
        current_player_index : 0,
        current_letter       : 'No letter selected'
    };
}

board.select_next_letter = function select_next_letter(playername) {
    inc_letter(playername, 1);
};

board.select_prev_letter = function select_prev_letter(playername) {
    // add length-1 instead of subtracting to avoid ever having to deal with
    // negative numbers
    inc_letter(playername, keys(board.player_list_parts).length - 1);
};

function inc_letter(playername, inc=0) {
    // get all the letters, sorted
    let letters = sort(keys(board.player_list_parts));

    // find the index of the current letter
    let letter_index = indexOf(letters, board[playername].current_letter);

    // add inc to the index
    letter_index += inc;

    // mod for length
    letter_index %= letters.length;

    // assign current_letter
    board[playername].current_letter = letters[letter_index];

    // assign selected_player
    update_current_player(playername);

    // reset current_player_index
    board[playername].current_player_index = 0;

    console.log(`LOGIN: letter '${board[playername].current_letter}' selected`);
}

board.select_next_player = function select_next_player(playername) {
    select_player(playername, 1);
};

board.select_prev_player = function select_prev_player(playername) {
    // add length-1 instead of subtracting to avoid ever having to deal with
    // negative numbers
    select_player(playername, board.player_list_parts[board[playername].current_letter].length - 1);
};

function select_player(playername, inc=0) {
    board[playername].current_player_index += inc;
    board[playername].current_player_index %= board.player_list_parts[board[playername].current_letter].length;
    update_current_player(playername);
    console.log(`LOGIN: player '${board[playername].selected_player.name}' selected`);
}

function update_current_player(playername) {
    board[playername].selected_player = board.player_list_parts[board[playername].current_letter][board[playername].current_player_index];
}


function score_handler(event) {
    var player = board.player_list[event.detail.player.id],
        score = event.detail.score,
        xhr = new XMLHttpRequest(),
        updatedPlayer = {};

    if (get(player, 'ping.hiscore') && score <= player.ping.hiscore) {
        return;
    }

    updatedPlayer[event.detail.player.id] = {
        ping: {
            hiscore: score,
            color: event.detail.player.color
        }
    };

    xhr.open('PUT', '/leaderboard/leaders.json');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.responseType = 'json';

    xhr.onload = function () {
        // console.log(xhr.response);
    };

    xhr.onerror = function () {
        console.log('error');
    };

    xhr.send(JSON.stringify(updatedPlayer));
}

function get_player_list() {
    var request = new XMLHttpRequest();
    request.open('GET',  '/leaderboard/leaders.json', true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            board.player_list = data;
            board.player_list_parts = groupBy(board.player_list, n => first(n.gamerID.toLowerCase()));

            each(['n', 's', 'e', 'w'], function(p) {
                // if the player has not yet selected a player or letter,
                // select the first letter and first player
                if (!board[p].current_letter || !board[p].selected_player) {
                    board[p].current_letter = first(sort(keys(board.player_list_parts)));
                    board[p].selected_player = board.player_list_parts[board[p].current_letter][0];
                }
            });

        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.send();
}

get_player_list();

/*
 * get the players list every 30 seconds so we can keep
 * the powerups current
 */
setInterval(get_player_list, conf.GET_PLAYER_LIST_REFRESH_MS);

document.addEventListener('score', score_handler);

export default board;
