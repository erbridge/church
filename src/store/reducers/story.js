import { handleActions } from 'redux-actions';

import { ADD_PARAGRAPH, SET_IMAGE } from '../actions/story';

export default handleActions(
  {
    [ADD_PARAGRAPH]: {
      next(state, { payload: { text } }) {
        return { ...state, paragraphs: [...state.paragraphs, text] };
      },
      throw(state, { payload }) {
        console.error(payload);

        // FIXME: Do something more with the error.
        return state;
      },
    },
    [SET_IMAGE]: {
      next(state, { payload: { image } }) {
        return { ...state, image };
      },
      throw(state, { payload }) {
        console.error(payload);

        // FIXME: Do something more with the error.
        return state;
      },
    },
  },
  {
    image: null,
    paragraphs: [],
  },
);
