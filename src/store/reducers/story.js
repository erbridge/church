import { handleActions } from 'redux-actions';

import { ADD_PARAGRAPH } from '../actions/story';

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
  },
  {
    paragraphs: [],
  },
);
