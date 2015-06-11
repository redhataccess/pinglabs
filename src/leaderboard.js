/**
 * Confusingly, this module both posts data to the leaderboard when a player
 * scores, AND fetches player names from the leaderboard so new players may
 * select their "account".
 */

import { chunk, groupBy, first, sortBy as sort, keys, without, indexOf } from 'lodash';
import * as conf from 'conf';
import players from 'players';

export let player_list          = {};
export let player_list_parts    = {};
export let current_player_index = 0;
export let selected_player      = {};
export let current_letter;

export function select_next_letter() {
    select_letter(1);
}

export function select_prev_letter() {
    // add length-1 instead of subtracting to avoid ever having to deal with
    // negative numbers
    select_letter((player_list_parts[current_letter].length - 1));
}

function select_letter(inc=0) {
    // get all the letters, sorted
    let letters = sort(keys(player_list_parts));

    // find the index of the current letter
    let letter_index = indexOf(letters, current_letter);

    // add inc to the index
    letter_index += inc;

    // mod for length
    letter_index %= letters.length;

    // assign current_letter
    current_letter = letters[letter_index];

    // assign selected_player
    update_current_player();

    // reset current_player_index
    current_player_index = 0;
}

export function select_next_player() {
    select_player(1);
}

export function select_prev_player() {
    // add length-1 instead of subtracting to avoid ever having to deal with
    // negative numbers
    select_player(player_list_parts[current_letter].length - 1);
}

function select_player(inc=0) {
    current_player_index += inc;
    current_player_index %= player_list_parts[current_letter].length;
    update_current_player();
}

function update_current_player() {
    selected_player = player_list_parts[current_letter][current_player_index];
}


// const alphabet = 'abcdefghijklmnopqrstuvwxyz';
// const alpha_chunks = chunk(alphabet, conf.LOGIN_ALPHABET_CHUNK_SIZE);

function score_handler(event) {
    var player = event.detail.player,
        score = event.detail.score,
        xhr = new XMLHttpRequest(),
        updatedPlayer = {};

    if (score < player.ping.hiscore) {
        return;
    }

    updatedPlayer[player.id] = {
        ping: {
            hiscore: score,
            color: player.color
        }
    };

    xhr.open('PUT', '/leaderboard/leaders.json');
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.responseType = 'json';

    xhr.onload = function () {
        console.log(xhr.response);
    };

    xhr.onerror = function () {
        console.log('error');
    };

    xhr.send(JSON.stringify(updatedPlayer));
}

function get_player_list() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://summit-games.usersys.redhat.com/users', true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            player_list = data;
            player_list_parts = groupBy(player_list, n => first(n.name.toLowerCase()));
            current_letter = first(sort(keys(player_list_parts)));
            selected_player = player_list_parts[current_letter][0];
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.send();
}

get_player_list();
document.addEventListener('score', score_handler);
