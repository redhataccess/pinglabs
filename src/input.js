import Phaser from 'Phaser';
import { each, identity } from 'lodash';

let gamepads = {};
let cursors;
let a_kb;
let b_kb;
let buttons_pressed = {
    pad1: { a: false, b: false, start: false },
    pad2: { a: false, b: false, start: false },
    pad3: { a: false, b: false, start: false },
    pad4: { a: false, b: false, start: false }
};

function init(game) {
    cursors = game.input.keyboard.createCursorKeys();
    if (!game.input.gamepad.active) {
        game.input.gamepad.start();
        gamepads.pad1 = game.input.gamepad.pad1;
        gamepads.pad2 = game.input.gamepad.pad2;
        gamepads.pad3 = game.input.gamepad.pad3;
        gamepads.pad4 = game.input.gamepad.pad4;

        each(gamepads, set_connect_callback);
    }
    a_kb = game.input.keyboard.addKey(Phaser.Keyboard.A);
    b_kb = game.input.keyboard.addKey(Phaser.Keyboard.B);
}

function set_connect_callback(gamepad) {
    gamepad.onConnectCallback = connect_callback;
}

function connect_callback() {
    console.log(`INPUT: gamepad connected, index ${this.index}`);
}

function connected(pad) {
    return gamepads[pad].connected;
}

function left(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.0;
}
function right(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.0;
}
function up(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < 0.0;
}
function down(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.0;
}

function left_once(pad) {
    return pressed_once(pad, null, 'left', left);
}
function right_once(pad) {
    return pressed_once(pad, null, 'right', right);
}
function up_once(pad) {
    return pressed_once(pad, null, 'up', up);
}
function down_once(pad) {
    return pressed_once(pad, null, 'down', down);
}

function left_kb() {
    return cursors.left.isDown;
}
function right_kb() {
    return cursors.right.isDown;
}
function down_kb() {
    return cursors.down.isDown;
}
function up_kb() {
    return cursors.up.isDown;
}

function pressed_once(pad, button_code, button_name, predicate) {

    // was this button already down, last frame?
    let already_pressed   = buttons_pressed[pad][button_name];

    // is the button held down this frame?
    let currently_pressed;

    if (predicate) {
        currently_pressed = predicate(pad);
    }
    else {
        currently_pressed = gamepads[pad].isDown(Phaser.Gamepad[button_code]);
    }

    // update the button state so next frame we know whether the button was
    // pressed this frame
    buttons_pressed[pad][button_name] = currently_pressed;

    return currently_pressed && !already_pressed;
}

function start_pressed(pad) {
    return pressed_once(pad, 'BUTTON_9', 'start');
}
function a(pad) {
    return pressed_once(pad, 'BUTTON_1', 'a');
}
function b(pad) {
    return pressed_once(pad, 'BUTTON_0', 'b');
}

export default {
    init,
    gamepads,
    connected,
    left,
    right,
    up,
    down,
    left_once,
    right_once,
    up_once,
    down_once,
    left_kb,
    right_kb,
    up_kb,
    down_kb,
    a,
    b,
    buttons_pressed,
    start_pressed
};


