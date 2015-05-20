import Phaser from 'Phaser';
import { each } from 'lodash';

let gamepads = {};
let frame_ms = 1000/60;

function init(game) {
    if (!game.input.gamepad.active) {
        game.input.gamepad.start();
        gamepads.pad1 = game.input.gamepad.pad1;
        gamepads.pad2 = game.input.gamepad.pad2;
        gamepads.pad3 = game.input.gamepad.pad3;
        gamepads.pad4 = game.input.gamepad.pad4;

        each(gamepads, set_connect_callback);
    }
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
function start_pressed(pad) {
    return gamepads[pad].justPressed(Phaser.Gamepad.BUTTON_9);
}

export default {
    init,
    gamepads,
    connected,
    left,
    right,
    up,
    down,
    start_pressed
};
