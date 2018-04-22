import types from './create.actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  capturedImages: [],
  id: null,
  updatingScreen: false,
  list: {
    data: [],
    loading: false,
    error: false
  },
  screens: {
    data: [],
    loading: false,
    error: false
  },
  create: {
    success: false,
    loading: false,
    error: false
  }
});

export default function create(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_PROTOTYPE_ID:
      return state.merge({id: action.payload});
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
    case types.CREATE_PROTOTYPE_REQUEST:
      return state.merge({create: {...state.create, loading: true}});
    case types.CREATE_PROTOTYPE_SUCCESS:
      return state.merge({create: {error: false, success: true, loading: false}});
    case types.CREATE_PROTOTYPE_FAILURE:
      return state.merge({create: {error: true, success: false, loading: false}});

    case types.GET_PROTOTYPE_LIST_REQUEST:
      return state.merge({list: {...state.list, loading: true}});
    case types.GET_PROTOTYPE_LIST_SUCCESS:
      return state.merge({list: {error: false, data: action.payload, loading: false}});
    case types.GET_PROTOTYPE_LIST_FAILURE:
      return state.merge({list: {error: true, data: [], loading: false}});

    case types.GET_SCREENS_REQUEST:
      return state.merge({screens: {...state.screens, loading: true}});
    case types.GET_SCREENS_SUCCESS:
      return state.merge({screens: {error: false, data: action.payload.screen, loading: false}});
    case types.GET_SCREENS_FAILURE:
      return state.merge({screens: {error: true, data: [], loading: false}});

    case types.UPDATE_SCREEN_ACTIONS_REQUEST:
      return state.merge({updatingScreen: true});
    case types.UPDATE_SCREEN_ACTIONS_SUCCESS:
      return state.merge({
        updatingScreen: false,
        screens: {
          ...state.screens,
          data: state.screens.data.map((screen) => {
            if (screen._id == action.payload.id) {
              return screen.merge({
                actions: action.payload.actions
              })
            }
            return screen;
          })
        }
      });
    case types.UPDATE_SCREEN_ACTIONS_FAILURE:
      return state.merge({updatingScreen: false});
    default:
      return state;
  }
}
