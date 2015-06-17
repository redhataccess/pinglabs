import * as tinycolor from 'tinycolor';

export const NAME = 'phaser-canvas-wrapper';
export let DEBUG = false;

/*********************
 *  Player settings  *
 *********************/

export const STARTING_LIVES = 4;
export const STARTING_SCORE = 0;
export const SCORING_SEC_PER_POINT = 3;
export const POINTS_PER_GOAL = 2;

export const COLOR_PLAYER_N = tinycolor('#5D9BFE');
export const COLOR_PLAYER_S = tinycolor('#26BF4A');
export const COLOR_PLAYER_E = tinycolor('#E7E746');
export const COLOR_PLAYER_W = tinycolor('#F72C2C');

/****************************
 *  Player state constants  *
 ****************************/

export const PLAYER_STATE = {
    LOGIN_CHOOSING_LETTER : 'player-state-login-choosing-letter',
    LOGIN_CHOOSING_PLAYER : 'player-state-login-choosing-player',
    PLAYING               : 'player-state-playing',
    INACTIVE              : 'player-state-inactive'
};

/******************************
 *  Puck and paddle settings  *
 ******************************/

// the magnitude of the puck's velocity increases by this much every time it
// hits something
export const PUCK_ACCELERATION = 36;

export const PUCK_RESET_MOVEMENT_DELAY      = 1000; // ms
export const INITIAL_PUCK_VELOCITY_MAG      = 160;  // initial magnitude of puck velocity
export const MAX_PUCK_VELOCITY_MAG          = 2000; // max puck velocity magnitude
export const PADDLE_PLACEMENT_WORLD_PADDING = 8;    // pixels between paddles and wall
export const PADDLE_VELOCITY_FROM_KEYPRESS  = 300;  // velocity given to paddle by user's keypress
export const PADDLE_SPRINGINESS_DEFAULT     = 1;    // how much to multiply puck velocity on hit

// the percentage of paddle velocity that is added to puck velocity on hit
export const PADDLE_PUCK_FRICTION = 0.36;

// the paddle's sprite has a glow, but the puck shouldn't bounce off the glow.
// this setting determines the width of the glow, so the actual physical body
// of the paddle is correct.
export const PADDLE_SPRITE_BODY_PADDING = 15;

/***********************
 *  Background colors  *
 ***********************/

export let BG_COLOR_BASE            = tinycolor('#000');
export let BG_COLOR_PUCK_PADDLE_HIT = tinycolor('#333');
export let BG_COLOR_PUCK_WORLD_HIT  = tinycolor('#aaa');
export let BG_COLOR_CURRENT         = tinycolor( BG_COLOR_BASE.toString() );

export let BG_COLOR_PLAYER_N_SCORE = COLOR_PLAYER_N.darken(20);
export let BG_COLOR_PLAYER_S_SCORE = COLOR_PLAYER_S.darken(20);
export let BG_COLOR_PLAYER_E_SCORE = COLOR_PLAYER_E.darken(20);
export let BG_COLOR_PLAYER_W_SCORE = COLOR_PLAYER_W.darken(20);

/******************
 *  Title screen  *
 ******************/

export const TITLE_POSITION = { x: 80, y: 100 };

/******************************************
 *  Color tweening, colors and durations  *
 ******************************************/

export const COLOR_TWEEN_PROPS = ['_r', '_g', '_b'];

export const BG_COLOR_PUCK_WORLD_HIT_IN   = 64;
export const BG_COLOR_PUCK_WORLD_HIT_OUT  = 1024;

export const BG_COLOR_PUCK_PADDLE_HIT_IN  = 64;
export const BG_COLOR_PUCK_PADDLE_HIT_OUT = 128;


/**********
 *  Text  *
 **********/

export const TEXT_FONT  = 'carrier_command';
export const TEXT_SIZE  = 64;
export const TEXT_COLOR = '#ffffff';
export const TEXT_ALIGN = '#ffffff';
export const TEXT_STYLE = { font: TEXT_FONT, fill: TEXT_COLOR, align: TEXT_ALIGN };

/******************
 *  Score screen  *
 ******************/

export const SCORE_POSITION = { x: 100, y: 100 };

/******************
 *  AI Behaviors  *
 ******************/

// from 0 to 1, how lax the AI is in pursuing the puck
export const AI_LAZINESS = 0.2;

/**************
 *  Powerups  *
 **************/

export const KICKSTARTER_MULTIPLIER = 1;
export const CURSED_VALUE           = -1;
export const UNCURSED_VALUE         = 1;
export const CURSED_DURATION        = 1000; // ms

/***********
 *  Login  *
 ***********/

export const LOGIN_ALPHABET_CHUNK_SIZE = 5; // a-e, f-j, etc

/*****************
 *  Leaderboard  *
 *****************/

export const GET_PLAYER_LIST_REFRESH_MS = 30000; // 30 seconds
