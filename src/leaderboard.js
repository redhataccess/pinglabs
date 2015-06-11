import { partition } from 'lodash';

export let player_list = {};
export let player_list_paritions = {};

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
