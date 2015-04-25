import * as tinycolor from 'tinycolor';

export const NAME = 'pinglabs';

/*********************
 *  Player settings  *
 *********************/

export const STARTING_LIVES = 2;

/******************************
 *  Puck and paddle settings  *
 ******************************/

// puck velocity magnitude increases by this much every time it hits something
export const PUCK_ACCELERATION = 4;

export const INITIAL_PUCK_VELOCITY_MAG      = 200;
export const MAX_PUCK_VELOCITY_MAG          = 600;
export const PADDLE_PLACEMENT_WORLD_PADDING = 0;
export const PADDLE_VELOCITY_FROM_KEYPRESS  = 300;

// the percentage of paddle velocity that is added to puck velocity on hit
export const PADDLE_PUCK_FRICTION = 0.30;

/***********************
 *  Background colors  *
 ***********************/

export let BG_COLOR_BASE            = tinycolor('#000');
export let BG_COLOR_PUCK_PADDLE_HIT = tinycolor('#333');
export let BG_COLOR_PUCK_WORLD_HIT  = tinycolor('#a00');
export let BG_COLOR_CURRENT         = tinycolor( BG_COLOR_BASE.toString() );

/******************************************
 *  Color tweening, colors and durations  *
 ******************************************/

export let COLOR_TWEEN_PROPS        = ['_r', '_g', '_b'];

export const BG_COLOR_PUCK_WORLD_HIT_IN = 64;
export const BG_COLOR_PUCK_WORLD_HIT_OUT = 768;

export const BG_COLOR_PUCK_PADDLE_HIT_IN = 64;
export const BG_COLOR_PUCK_PADDLE_HIT_OUT = 128;


/**********
 *  Text  *
 **********/

export const TEXT_FONT = 'carrier_command';
export const TEXT_SIZE = 64;
export const TEXT_COLOR = '#ffffff';
export const TEXT_ALIGN = '#ffffff';
export const TEXT_STYLE = { font: TEXT_FONT, fill: TEXT_COLOR, align: TEXT_ALIGN };

/******************
 *  Score screen  *
 ******************/

export const SCORE_POSITION = { x: 100, y: 100 };
