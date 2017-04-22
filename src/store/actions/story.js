import { createAction } from 'redux-actions';

export const ADD_PARAGRAPH = '@@church/ADD_PARAGRAPH';
export const CLEAR_PARAGRAPHS = '@@church/CLEAR_PARAGRAPHS';
export const SET_IMAGE = '@@church/SET_IMAGE';
export const CHOOSE_MOMENT = '@@church/CHOOSE_MOMENT';

export const addParagraph = createAction(ADD_PARAGRAPH);
export const clearParagraphs = createAction(CLEAR_PARAGRAPHS);
export const setImage = createAction(SET_IMAGE);
export const chooseMoment = createAction(CHOOSE_MOMENT);
