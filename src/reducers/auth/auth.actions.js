import { AsyncStorage, Platform, Linking } from 'react-native';
import { CALL_API } from 'redux-api-middleware';
import types from './auth.actionTypes';
import { loadAppScreen, loadLoginScreen } from '../app/app.actions';
import { API_URL } from '../';

export const checkAuthState = () => async (dispatch, getState) => {
  let savedValue = await AsyncStorage.getItem('@auth');
  if (savedValue) {
    savedValue = JSON.parse(savedValue);
    dispatch({
      type: types.LOGIN_SUCCESS,
      payload: savedValue
    });
    dispatch(loadAppScreen());
  } else {
    console.log('here');
    dispatch(loadLoginScreen());
    dispatch({
      type: types.NOT_LOGGED_IN
    })
  }
};

export const login = (email, password) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'POST',
      endpoint: `/auth/login`,
      headers: {
        'NO-AUTH': true
      },
      body: JSON.stringify({
        email, password
      }),
      types: [
        types.LOGIN_REQUEST,
        types.LOGIN_SUCCESS,
        types.LOGIN_FAILURE,
      ]
    }
  })
  .then((res) => {
    // if login success transition to new root
    if (!res.error && !res.payload.error) {
      dispatch(loadAppScreen());
    }
  });
};

export const resetPassword = (password, code, phone) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'POST',
      endpoint: `/auth/reset_password`,
      headers: {
        'No-Auth': true
      },
      body: JSON.stringify({
        code,
        phone_number: phone,
        password: password
      }),
      types: [
        types.RESET_PASSWORD_REQUEST,
        types.RESET_PASSWORD_SUCCESS,
        types.RESET_PASSWORD_FAILURE,
      ]
    }
  }).then((res) => {
    // if reset password success transition to login screen
    if (!res.payload.error) {
      dispatch(loadLoginScreen());
    }
  });
};

export const registerUser = (userObj) => (dispatch, getState) => {
  return dispatch({
    [CALL_API]: {
      method: 'POST',
      endpoint: `/auth/signup`,
      headers: {
        'NO-AUTH': true
      },
      body: JSON.stringify(userObj),
      types: [
        types.REGISTER_USER_REQUEST,
        types.REGISTER_USER_SUCCESS,
        types.REGISTER_USER_FAILURE,
      ]
    }
  });
};


export const logout = () => async (dispatch, getState) => {
  const success = await AsyncStorage.removeItem('@auth');
  dispatch(loadLoginScreen());
  return dispatch({
    type: types.LOGOUT_SUCCESS
  });
};
