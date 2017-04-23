import { handleActions } from 'redux-actions';

import {
  ADD_PARAGRAPH,
  CHOOSE_MOMENT,
  CLEAR_PARAGRAPHS,
  SET_IMAGE,
  WAIT_FOR_INPUT,
} from '../actions/story';

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
    [CLEAR_PARAGRAPHS]: {
      next(state) {
        return { ...state, paragraphs: [] };
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
    [WAIT_FOR_INPUT]: {
      next(state) {
        return { ...state, waitingForInput: true };
      },
      throw(state, { payload }) {
        console.error(payload);

        // FIXME: Do something more with the error.
        return state;
      },
    },
    [CHOOSE_MOMENT]: {
      next(state, { payload: { moment } }) {
        return {
          ...state,
          moment,
          visitedMoments: [...state.visitedMoments, moment],
          waitingForInput: false,
        };
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
    moment: null,
    paragraphs: [],
    visitedMoments: [],
    waitingForInput: true,
  },
);
