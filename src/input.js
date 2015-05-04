import Phaser from 'Phaser';

let gamepads = {};

function init(game) {
    if (!game.input.gamepad.active) {
        game.input.gamepad.start();
        gamepads.pad1 = game.input.gamepad.pad1;
        gamepads.pad2 = game.input.gamepad.pad2;
        gamepads.pad3 = game.input.gamepad.pad3;
        gamepads.pad4 = game.input.gamepad.pad4;
    }
}

function moving_left(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < 0.0;
}
function moving_right(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.0;
}
function moving_up(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < 0.0;
}
function moving_down(pad) {
    return gamepads[pad].axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.0;
}

// function reset(game) {
//     game.input.gamepad.reset();
// }

export default {
    init,
    gamepads,
    moving_left,
    moving_right,
    moving_up,
    moving_down
};
