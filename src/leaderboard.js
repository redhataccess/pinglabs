import { partition } from 'lodash';
import players from 'players';

export let player_list = {};
export let player_list_paritions = {};

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
            // Success!
            var data = JSON.parse(this.response);
            console.log(data);
            player_list = data;

            player_list_paritions = {
                'a-e': '',
                'g-j': '',
                'k-o': '',
                'p-t': '',
                'u-z': ''
            };
        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}

get_player_list();
document.addEventListener('score', score_handler);
