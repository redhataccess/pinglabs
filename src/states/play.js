import Phaser from 'Phaser';
import state from 'states/state';
import { map, any, invoke } from 'lodash';
import { hit_world, hit_puck, reset_puck } from 'collision';
import input from 'input';
import players from 'players';
import * as conf from 'conf';
import * as scores from 'scores';
import * as move from 'commands/move-paddle';
import * as scorecards from 'scorecards';

let puck;
let paddles = {};
let cursors;
let player_codes = ['n', 's', 'e', 'w'];

function check_out_of_bounds(game, puck) {
    if (puck.body.position.y < game.world.bounds.top) {
        return 'n';
    }
    else if (puck.body.position.y + puck.body.height > game.world.bounds.bottom) {
        return 's';
    }
    else if (puck.body.position.x + puck.body.width > game.world.bounds.right) {
        return 'e';
    }
    else if (puck.body.position.x < game.world.bounds.left) {
        return 'w';
    }
    else {
        return;
    }
}

function set_body_to_sprite_size(sprite, rotate90) {
    if (rotate90) {
        sprite.body.setSize(sprite.height, sprite.width);
    }
    else {
        sprite.body.setSize(sprite.width, sprite.height);
    }
}

function update_bg_color(game) {
    game.stage.backgroundColor = conf.BG_COLOR_CURRENT.toHexString();
}

function play_if_start_pressed(player) {
    if (!players[player].playing && input.start_pressed(players[player].pad)) {
        players[player].start.execute();
    }
}

function play_if_start_clicked(player) {
    if (!players[player].playing) {
        players[player].start.execute();
    }
}

function execute_powerup_if_b(player) {
    if (input.b(players[player].pad)) {
        players[player].execute_powerup();
    }
}

function rotate_powerup_if_a(player) {
    if (input.a(players[player].pad)) {
        players[player].rotate_powerups();
    }
}

function move_paddle(player) {
    // move the player with gamepad if player is active.  else let AI decide
    // how to move.

    let pl = players[player];
    let pad = paddles[player];

    if (pl.playing) {
        if (input[pl.neg](pl.pad)) {
            move[pl.neg].execute(pl, pad);
        }
        if (input[pl.pos](pl.pad)) {
            move[pl.pos].execute(pl, pad);
        }

        if (cursors.left.isDown || cursors.up.isDown) {
            move[pl.neg].execute(pl, pad);
        }

        if (cursors.right.isDown || cursors.down.isDown) {
            move[pl.pos].execute(pl, pad);
        }
    }
    else {

        // AI IS HERE!
        // find the distance between the puck and the paddle, but only on the
        // axis of movement
        let on_axis    = pl.axis;
        let off_axis   = pl.axis === 'x' ? 'y' : 'x';

        let on_axis_d  = puck.body.center[on_axis]  - pad.body.center[on_axis];
        let off_axis_d = puck.body.center[off_axis] - pad.body.center[off_axis];

        if (on_axis_d > conf.AI_DISTANCE_IMPETUS) {
            move[pl.pos].execute(pl, pad);
        }
        else if (on_axis_d < -conf.AI_DISTANCE_IMPETUS) {
            move[pl.neg].execute(pl, pad);
        }
    }
}

function press_start_click_handler() {
    if (!any(players, 'playing')) {
        let player = this.getAttribute('data-player');
        play_if_start_clicked(player);
    }
}

export default class play_state extends state {
    constructor() {
        super('play');
    }
    create(game) {

        scorecards.create(players);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        scores.reset_all();

        puck = game.add.sprite( game.world.centerX, game.world.centerY, 'puck');

        paddles.n = game.add.sprite( game.world.centerX, conf.PADDLE_PLACEMENT_WORLD_PADDING, 'paddle-blue');
        paddles.s = game.add.sprite( game.world.centerX, game.world.height - conf.PADDLE_PLACEMENT_WORLD_PADDING - 20, 'paddle-green');
        paddles.e = game.add.sprite( game.world.width - conf.PADDLE_PLACEMENT_WORLD_PADDING, game.world.centerY, 'paddle-yellow');
        paddles.w = game.add.sprite( conf.PADDLE_PLACEMENT_WORLD_PADDING + 20, game.world.centerY, 'paddle-red');

        paddles.n.addChild(game.make.sprite(0, 0, 'paddle-blue'));

        paddles.w.angle = 90;
        paddles.e.angle = 90;

        game.physics.enable([puck, paddles.n, paddles.s, paddles.e, paddles.w], Phaser.Physics.ARCADE);

        puck.name = 'PUCK';
        puck.body.setSize(20, 20, puck.height/2 - 10, puck.width/2 - 10);

        reset_puck(puck);

        paddles.n.name = 'n';
        paddles.s.name = 's';
        paddles.e.name = 'e';
        paddles.w.name = 'w';
        paddles.n.body.immovable = true;
        paddles.s.body.immovable = true;
        paddles.e.body.immovable = true;
        paddles.w.body.immovable = true;
        paddles.n.body.collideWorldBounds = true;
        paddles.s.body.collideWorldBounds = true;
        paddles.e.body.collideWorldBounds = true;
        paddles.w.body.collideWorldBounds = true;
        set_body_to_sprite_size(paddles.n);
        set_body_to_sprite_size(paddles.s);
        set_body_to_sprite_size(paddles.e, true);
        set_body_to_sprite_size(paddles.w, true);

        // not sure why this offset is needed, but it lines up the hitboxes with
        // the sprites.
        paddles.w.body.offset.x = -20;
        paddles.e.body.offset.x = -20;

        // pad_n.body.offset.y = +20;
        // pad_s.body.offset.y = +20;

        // puck.body.collideWorldBounds = true;
        puck.body.bounce.setTo(1, 1);

        update_bg_color(game);

        cursors = game.input.keyboard.createCursorKeys();

        let press_start_elements = document.querySelectorAll('.press-start');
        invoke(press_start_elements, 'addEventListener', 'click', press_start_click_handler, false);
    }
    update(game) {

        game.physics.arcade.collide(puck, [paddles.n, paddles.s, paddles.e, paddles.w], hit_puck, null, this);

        paddles.n.body.velocity.setMagnitude(0);
        paddles.s.body.velocity.setMagnitude(0);
        paddles.e.body.velocity.setMagnitude(0);
        paddles.w.body.velocity.setMagnitude(0);

        update_bg_color(game);

        let oob = check_out_of_bounds(game, puck);
        if (oob) {
            hit_world(puck, oob);
        }

        // check for players pressing start to join the game

        map(player_codes, play_if_start_pressed);

        // map input to commands

        map(player_codes, move_paddle);
        map(player_codes, execute_powerup_if_b);
        map(player_codes, rotate_powerup_if_a);

        // update the player status scorecards

        scorecards.update();
    }

    render(game) {
        if (conf.DEBUG) {
            game.debug.body(puck);
            game.debug.body(paddles.n);
            game.debug.body(paddles.s);
            game.debug.body(paddles.e);
            game.debug.body(paddles.w);
        }
    }
}
