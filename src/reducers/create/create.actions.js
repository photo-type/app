import { AsyncStorage } from 'react-native';
import types from './create.actionTypes';
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