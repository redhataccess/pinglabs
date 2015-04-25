function preload() {

    this.game.load.image('loading', 'assets/sprites/paddle.png');

    let loading_bar = this.add.sprite(160,240,'loading');
    loading_bar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loading_bar);

    this.game.load.image('puck', 'assets/sprites/puck.png');
    this.game.load.image('paddle', 'assets/sprites/paddle.png');
    this.game.load.audio('puck-hit-paddle', 'assets/sounds/puck-hit-paddle.ogg');
    this.game.load.audio('puck-oob', 'assets/sounds/puck-oob.mp3');
}

function create() {}
function update() {}
function render() {}

export default function title_state(game_arg) {
    console.log(`STATE activated: title`);
}

title_state.prototype = {
    preload,
    create,
    update,
    render
};
