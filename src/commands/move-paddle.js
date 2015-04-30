import * as command from 'commands/command';
import * as conf from 'conf';

class move_paddle_command extends command {

    constructor(axis='x', speed=1) {
        super('move_paddle');
        this.axis   = axis;
        this.speed  = speed;
    }

    execute (paddle, factor=1) {
        paddle.body.velocity[this.axis] += this.speed * factor;
    }

}

var up    = new move_paddle_command('y', -conf.PADDLE_VELOCITY_FROM_KEYPRESS);
var down  = new move_paddle_command('y', conf.PADDLE_VELOCITY_FROM_KEYPRESS);
var left  = new move_paddle_command('x', -conf.PADDLE_VELOCITY_FROM_KEYPRESS);
var right = new move_paddle_command('x', conf.PADDLE_VELOCITY_FROM_KEYPRESS);

export {
    up,
    down,
    left,
    right
};
