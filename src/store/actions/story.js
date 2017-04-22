import { createAction } from 'redux-actions';

export const ADD_PARAGRAPH = '@@church/ADD_PARAGRAPH';

export const SET_IMAGE = '@@church/SET_IMAGE';

export const addParagraph = createAction(ADD_PARAGRAPH);

export const setImage = createAction(SET_IMAGE);
