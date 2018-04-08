import types from './create.actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  capturedImages: []
});

export default function create(state = initialState, action = {}) {
  switch (action.type) {
    case types.ADD_IMAGE:
      return state.merge({
        capturedImages: [action.payload, ...state.capturedImages]
      });
    case types.REMOVE_IMAGE:
      return state.merge({
        capturedImages: state.capturedImages.asMutable().filter((img, ind) => (
          ind !== action.payload
        ))
      });
    default:
      return state;
  }
}
