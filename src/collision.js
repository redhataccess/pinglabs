import Phaser from 'Phaser';
import { pick } from 'lodash';
import * as conf from 'conf';
import SOUNDS from 'sounds';
import scores from 'scores';

function hit_puck(puck, paddle) {
    console.log(`COLLISION: ${puck.name} (${puck.body.velocity.x.toFixed(2)}, ${puck.body.velocity.y.toFixed(2)}), ${paddle.name} (${puck.body.velocity.x.toFixed(2)}, ${puck.body.velocity.y.toFixed(2)})`);

    SOUNDS.PUCK_HIT_PADDLE.play();

    // save the puck's current velocity magnitude
    var puck_vel_mag = puck.body.velocity.getMagnitude();

    // add a fraction of the paddle's velocity to the puck (for angle shots)
    puck.body.velocity.add(
        paddle.body.velocity.x * conf.PADDLE_PUCK_FRICTION,
        paddle.body.velocity.y * conf.PADDLE_PUCK_FRICTION
    );

    // reset the puck's velocity's magnitude, plus a little oomph
    puck.body.velocity.setMagnitude(
        puck_vel_mag + conf.PUCK_ACCELERATION
    );

    // lighten up the background a bit for fun :)
    let tween = puck.game.add.tween(conf.BG_COLOR_CURRENT)
    .to(
        pick(conf.BG_COLOR_PUCK_PADDLE_HIT, conf.COLOR_TWEEN_PROPS),
        conf.BG_COLOR_PUCK_PADDLE_HIT_IN,
        Phaser.Easing.Linear.None
    )
    .to(
        pick(conf.BG_COLOR_BASE, conf.COLOR_TWEEN_PROPS),
        conf.BG_COLOR_PUCK_PADDLE_HIT_OUT,
        Phaser.Easing.Linear.None
    )
    .start();
}

function hit_world(puck, side) {
    console.log(`COLLISION: ${puck.name} (${puck.body.velocity.x.toFixed()}, ${puck.body.velocity.y.toFixed()}), ${side.toUpperCase()} WALL`);

    scores[side]--;

    console.log(`SCORE: ${side} player loses a point, now at ${scores[side]}`);

    if (scores[side] === 0) {
        puck.game.state.start('score');
    } else {

        SOUNDS.PUCK_OOB.play();

        reset_puck(puck);

        let tween = puck.game.add.tween(conf.BG_COLOR_CURRENT)
        .to(
            pick( conf.BG_COLOR_PUCK_WORLD_HIT, conf.COLOR_TWEEN_PROPS),
            conf.BG_COLOR_PUCK_WORLD_HIT_IN,
            Phaser.Easing.Linear.None
        )
        .to(
            pick(conf.BG_COLOR_BASE, conf.COLOR_TWEEN_PROPS),
            conf.BG_COLOR_PUCK_WORLD_HIT_OUT,
            Phaser.Easing.Linear.None)
            .start();
    }
}

function reset_puck(puck) {
    puck.body.position.set(puck.game.world.centerX - puck.width/2, puck.game.world.centerY - puck.height/2);

    //  This gets it moving
    puck.body.velocity.setTo( Math.random() - 0.5, Math.random() - 0.5);
    puck.body.velocity.setMagnitude(conf.INITIAL_PUCK_VELOCITY_MAG);
    puck.body.maxVelocity.setMagnitude(conf.MAX_PUCK_VELOCITY_MAG);
}

export { hit_puck, hit_world, reset_puck };
