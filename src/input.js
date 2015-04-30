
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

// function reset(game) {
//     game.input.gamepad.reset();
// }

export default { init, gamepads };
