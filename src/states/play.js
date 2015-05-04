import Phaser from 'Phaser';
import state from 'states/state';
import { hit_world, hit_puck, reset_puck } from 'collision';
import input from 'input';
import * as conf from 'conf';
import * as scores from 'scores';
import * as move from 'commands/move-paddle';

let puck;
let paddle_n;
let paddle_s;
let paddle_e;
let paddle_w;
let cursors;

function check_out_of_bounds(game, puck) {
    if (puck.body.position.y < game.world.bounds.top) {
        return 'n';
    } else if (puck.body.position.y + puck.body.height > game.world.bounds.bottom) {
        return 's';
    } else if (puck.body.position.x + puck.body.width > game.world.bounds.right) {
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

        paddle_n = game.add.sprite( game.world.centerX, conf.PADDLE_PLACEMENT_WORLD_PADDING, 'paddle-blue');
        paddle_s = game.add.sprite( game.world.centerX, game.world.height - conf.PADDLE_PLACEMENT_WORLD_PADDING - 20, 'paddle-green');
        paddle_e = game.add.sprite( game.world.width - conf.PADDLE_PLACEMENT_WORLD_PADDING, game.world.centerY, 'paddle-yellow');
        paddle_w = game.add.sprite( conf.PADDLE_PLACEMENT_WORLD_PADDING + 20, game.world.centerY, 'paddle-red');

        paddle_n.addChild(game.make.sprite(0, 0, 'paddle-blue'));
        let blur_x_filter = game.add.filter('BlurX');
        let blur_y_filter = game.add.filter('BlurY');

        paddle_n.children[0].filters = [blur_x_filter, blur_y_filter];
        paddle_n.filters = [blur_x_filter, blur_y_filter];


        paddle_w.angle = 90;
        paddle_e.angle = 90;

        game.physics.enable([puck, paddle_n, paddle_s, paddle_e, paddle_w], Phaser.Physics.ARCADE);

        reset_puck(puck);

        puck.name = 'PUCK';
        puck.body.setSize(20, 20, puck.height/2 - 10, puck.width/2 - 10);
        paddle_n.name = 'PADDLE_N';
        paddle_s.name = 'PADDLE_S';
        paddle_e.name = 'PADDLE_E';
        paddle_w.name = 'PADDLE_W';
        paddle_n.body.immovable = true;
        paddle_s.body.immovable = true;
        paddle_e.body.immovable = true;
        paddle_w.body.immovable = true;
        paddle_n.body.collideWorldBounds = true;
        paddle_s.body.collideWorldBounds = true;
        paddle_e.body.collideWorldBounds = true;
        paddle_w.body.collideWorldBounds = true;
        set_body_to_sprite_size(paddle_n);
        set_body_to_sprite_size(paddle_s);
        set_body_to_sprite_size(paddle_e, true);
        set_body_to_sprite_size(paddle_w, true);

        // not sure why this offset is needed, but it lines up the hitboxes with
        // the sprites.
        paddle_w.body.offset.x = -20;
        paddle_e.body.offset.x = -20;

        // pad_n.body.offset.y = +20;
        // pad_s.body.offset.y = +20;

        // puck.body.collideWorldBounds = true;
        puck.body.bounce.setTo(1, 1);


        game.stage.backgroundColor = conf.BG_COLOR_CURRENT.toHexString();

        cursors = game.input.keyboard.createCursorKeys();
    }
    update(game) {

        game.physics.arcade.collide(puck, [paddle_n, paddle_s, paddle_e, paddle_w], hit_puck, null, this);

        paddle_n.body.velocity.setMagnitude(0);
        paddle_s.body.velocity.setMagnitude(0);
        paddle_e.body.velocity.setMagnitude(0);
        paddle_w.body.velocity.setMagnitude(0);

        update_bg_color(game);

        let oob = check_out_of_bounds(game, puck);
        if (oob) {
            hit_world(puck, oob);
        }

        // map input to movement commands

        if (input.moving_up('pad1'))    { move.up.execute(paddle_w); }
        if (input.moving_down('pad1'))  { move.down.execute(paddle_w); }

        if (input.moving_up('pad2'))    { move.up.execute(paddle_e); }
        if (input.moving_down('pad2'))  { move.down.execute(paddle_e); }

        if (input.moving_left('pad3'))  { move.left.execute(paddle_n); }
        if (input.moving_right('pad3')) { move.right.execute(paddle_n); }

        if (input.moving_left('pad4'))  { move.left.execute(paddle_s); }
        if (input.moving_right('pad4')) { move.right.execute(paddle_s); }
    }
    // render() {
    //     game.debug.body(puck);
    //     game.debug.body(pad_n);
    //     game.debug.body(pad_s);
    //     game.debug.body(pad_e);
    //     game.debug.body(pad_w);
    // }
}
