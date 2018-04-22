import { AsyncStorage } from 'react-native';
import types from './create.actionTypes';
import {CALL_API} from 'redux-api-middleware';
import {checkAuthState} from '../auth/auth.actions';

export const addImage = (image) => (dispatch) => {
  return dispatch({
    type: types.ADD_IMAGE,
    payload: image
  });
}

export const removeImage = (index) => (dispatch) => {
  return dispatch({
    type: types.REMOVE_IMAGE,
    payload: index
  });
}

export const setCurrentPrototype = (id) => (dispatch) => {
  return dispatch({
    type: types.SET_PROTOTYPE_ID,
    payload: id
  })
};

export const getScreens = () => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'GET',
      endpoint: `/prototypes/${getState().create.id}/screens`,
      types: [
        types.GET_SCREENS_REQUEST,
        types.GET_SCREENS_SUCCESS,
        types.GET_SCREENS_FAILURE,
      ]
    }
  });
};

export const updateScreen = (id, actions) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'PUT',
      endpoint: `/screens/${id}`,
      body: JSON.stringify(actions),
      types: [
        types.UPDATE_SCREEN_ACTIONS_REQUEST,
        {
          type: types.UPDATE_SCREEN_ACTIONS_SUCCESS,
          payload: (action, state, res) => {
            return res.json().then((json) => {
              json.id = id;
              return json;
            });
          }
        },
        types.UPDATE_SCREEN_ACTIONS_FAILURE,
      ]
    }
  });
};

export const listPrototypes = () => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'GET',
      endpoint: `/prototypes`,
      types: [
        types.GET_PROTOTYPE_LIST_REQUEST,
        types.GET_PROTOTYPE_LIST_SUCCESS,
        types.GET_PROTOTYPE_LIST_FAILURE,
      ]
    }
  });
};

export const createPrototype = (name) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'POST',
      endpoint: `/prototypes`,
      body: JSON.stringify({
        name
      }),
      types: [
        types.CREATE_PROTOTYPE_REQUEST,
        types.CREATE_PROTOTYPE_SUCCESS,
        types.CREATE_PROTOTYPE_FAILURE,
      ]
    }
  });
};