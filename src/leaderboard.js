import { chunk, groupBy, first } from 'lodash';
import * as conf from 'conf';
import players from 'players';

export let player_list       = {};
export let player_list_parts = {};

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
            console.log(player_list_parts);
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.send();
}

get_player_list();
document.addEventListener('score', score_handler);
