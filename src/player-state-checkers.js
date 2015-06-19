/**
 * Player state predicates.
 */

import * as conf from 'conf';

export const inactive        = p => p.state === conf.PLAYER_STATE.INACTIVE;
export const playing         = p => p.state === conf.PLAYER_STATE.PLAYING;
export const choosing_letter = p => p.state === conf.PLAYER_STATE.LOGIN_CHOOSING_LETTER;
export const choosing_name   = p => p.state === conf.PLAYER_STATE.LOGIN_CHOOSING_PLAYER;
export const logging_in      = p => choosing_letter(p) || choosing_name(p);
