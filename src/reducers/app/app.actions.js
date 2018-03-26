import { AsyncStorage } from 'react-native';
import types from './app.actionTypes';
import {checkAuthState} from '../auth/auth.actions';

export function appInitialized() {
  return async function(dispatch, getState) {
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    dispatch({type: types.APP_STARTED});
  };
}

export function changeAppRoot(root) {
  return {type: types.ROOT_CHANGED, root: root};
}

export function loadAppScreen() {
  return function(dispatch, getState) {
    dispatch(changeAppRoot('after-login'));
  };
}

export function loadLoginScreen() {
  return function(dispatch, getState) {
    dispatch(changeAppRoot('login'));
  };
}
