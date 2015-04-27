import Phaser from 'Phaser';
import * as conf from 'conf';
import state from 'states/state';
import { hit_world, hit_puck, reset_puck } from 'collision';
import * as scores from 'scores';

let puck;
let pad_n;
let pad_s;
let pad_e;
let pad_w;
let cursors;

function check_out_of_bounds(game, puck) {
    if (puck.body.position.y < game.world.bounds.top) {
        return 'n';
    } else if (puck.body.position.y + puck.height > game.world.bounds.bottom) {
        return 's';
    } else if (puck.body.position.x + puck.width > game.world.bounds.right) {
        return 'e';
    } else if (puck.body.position.x < game.world.bounds.left) {
        return 'w';
    } else {
        return;
    }
}

function set_body_to_sprite_size(sprite, rotate) {
    if (rotate) {
        sprite.body.setSize(sprite.height, sprite.width);
    } else {
        sprite.body.setSize(sprite.width, sprite.height);
    }
}

function update_bg_color(game) {
    game.stage.backgroundColor = conf.BG_COLOR_CURRENT.toHexString();
}


export default class play_state extends state {
    constructor() {
        super('play');
    }
    create(game) {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        scores.reset();

        puck = game.add.sprite( game.world.centerX, game.world.centerY, 'puck');

        pad_n = game.add.sprite( game.world.centerX, conf.PADDLE_PLACEMENT_WORLD_PADDING, 'paddle');
        pad_s = game.add.sprite( game.world.centerX, game.world.height - conf.PADDLE_PLACEMENT_WORLD_PADDING - 20, 'paddle');
        pad_e = game.add.sprite( game.world.width - conf.PADDLE_PLACEMENT_WORLD_PADDING, game.world.centerY, 'paddle');
        pad_w = game.add.sprite( conf.PADDLE_PLACEMENT_WORLD_PADDING + 20, game.world.centerY, 'paddle');

        pad_w.angle = 90;
        pad_e.angle = 90;

        game.physics.enable([puck, pad_n, pad_s, pad_e, pad_w], Phaser.Physics.ARCADE);

        reset_puck(puck);

        puck.name = 'PUCK';
        pad_n.name = 'PADDLE_N';
        pad_s.name = 'PADDLE_S';
        pad_e.name = 'PADDLE_E';
        pad_w.name = 'PADDLE_W';
        pad_n.body.immovable = true;
        pad_s.body.immovable = true;
        pad_e.body.immovable = true;
        pad_w.body.immovable = true;
        pad_n.body.collideWorldBounds = true;
        pad_s.body.collideWorldBounds = true;
        pad_e.body.collideWorldBounds = true;
        pad_w.body.collideWorldBounds = true;
        set_body_to_sprite_size(pad_n);
        set_body_to_sprite_size(pad_s);
        set_body_to_sprite_size(pad_e, true);
        set_body_to_sprite_size(pad_w, true);

        // not sure why this offset is needed, but it lines up the hitboxes with
        // the sprites.
        pad_w.body.offset.x = -20;
        pad_e.body.offset.x = -20;

        // pad_n.body.offset.y = +20;
        // pad_s.body.offset.y = +20;

        // puck.body.collideWorldBounds = true;
        puck.body.bounce.setTo(1, 1);


        game.stage.backgroundColor = conf.BG_COLOR_CURRENT.toHexString();

        cursors = game.input.keyboard.createCursorKeys();
    }
    update(game) {

        game.physics.arcade.collide(puck, [pad_n, pad_s, pad_e, pad_w], hit_puck, null, this);

        pad_n.body.velocity.setMagnitude(0);
        pad_s.body.velocity.setMagnitude(0);
        pad_e.body.velocity.setMagnitude(0);
        pad_w.body.velocity.setMagnitude(0);

        update_bg_color(game);

        let oob = check_out_of_bounds(game, puck);
        if (oob) {
            hit_world(puck, oob);
        }

        if (cursors.left.isDown) {
            pad_n.body.velocity.x = -conf.PADDLE_VELOCITY_FROM_KEYPRESS;
            pad_s.body.velocity.x = -conf.PADDLE_VELOCITY_FROM_KEYPRESS;
        }
        if (cursors.right.isDown) {
            pad_n.body.velocity.x = conf.PADDLE_VELOCITY_FROM_KEYPRESS;
            pad_s.body.velocity.x = conf.PADDLE_VELOCITY_FROM_KEYPRESS;
        }
        if (cursors.down.isDown) {
            pad_e.body.velocity.y = conf.PADDLE_VELOCITY_FROM_KEYPRESS;
            pad_w.body.velocity.y = conf.PADDLE_VELOCITY_FROM_KEYPRESS;
        }
        if (cursors.up.isDown) {
            pad_e.body.velocity.y = -conf.PADDLE_VELOCITY_FROM_KEYPRESS;
            pad_w.body.velocity.y = -conf.PADDLE_VELOCITY_FROM_KEYPRESS;
        }
    }
    // render() {
    //     game.debug.body(puck);
    //     game.debug.body(pad_n);
    //     game.debug.body(pad_s);
    //     game.debug.body(pad_e);
    //     game.debug.body(pad_w);
    // }
}
