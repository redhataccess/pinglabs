import { last, without } from 'lodash';

let puck_hit_history = [undefined, undefined];

export function reset() {
    puck_hit_history = [undefined, undefined];
}

export function push(player_name) {
    puck_hit_history.shift();
    puck_hit_history.push(player_name);
    console.log(`PUCK HIT HISTORY: ${puck_hit_history}`);
}

export function scoring_player(goal_hit) {
    // get the scoring player by finding the player who most recently hit the
    // puck, but who isn't the player getting scored on.  this handles the case
    // where the puck glances off the side of your paddle and into your own
    // goal.  you should not get a point for that. ;)
    return last(without(puck_hit_history, goal_hit, undefined));
}
