import types from './auth.actionTypes';
import Immutable from 'seamless-immutable';
import { AsyncStorage } from 'react-native';

const initialState = Immutable({
  jwt: null,
  user: null,
  isLoggedIn: false,
  loading: false,
  error: false,
  resetPassword: false,
  errorMessage: null,
  sendOTPSuccess: false,
  registerUserSuccess: false,
  phone: null
});

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.SEND_OTP_REQUEST:
    case types.SOCIAL_SIGNUP_SAVE_PHONE_REQUEST:
    case types.REGISTER_USER_REQUEST:
    case types.RESET_PASSWORD_REQUEST:
      return state.merge({
        error: false,
        errorMessage: '',
        loading: true,
        resetPassword: false,
        sendOTPSuccess: false,
        registerUserSuccess: false
      });

    case types.LOGIN_SUCCESS:
      let tmpState = {};
      if (action.payload.error) {
        tmpState.error = true;
        tmpState.errorMessage = action.payload.message;
        tmpState.loading = false;
      } else {
        AsyncStorage.setItem('@auth', JSON.stringify(action.payload));
        tmpState = {
          jwt: action.payload.jwt,
          user: action.payload.data,
          isLoggedIn: true,
          error: false,
          loading: false
        }
      }
      return state.merge(tmpState);

      case types.RESET_PASSWORD_SUCCESS:
          let tempState = {};
          if (action.payload.error) {
              tempState.error = true;
              tempState.errorMessage = action.payload.message;
              tempState.resetPassword = false;
              tempState.loading = false;
          } else {
              tempState = {
                  error: false,
                  loading: false,
                  resetPassword: true,
              }
          }
          return state.merge(tempState);

    case types.REGISTER_USER_SUCCESS:
    console.log(action.payload, action.payload.error);
      if (action.payload.error) {
        return state.merge({
          registerUserSuccess: false,
          loading: false, error: true,
          errorMessage: action.payload.message,
        });
      } else {
        return state.merge({
          registerUserSuccess: true, loading: false, error: false,
        });
      }

    case types.SEND_OTP_SUCCESS:
      if (action.payload.error) {
        return state.merge({
          sendOTPSuccess: false,
          loading: false, error: true,
          errorMessage: action.payload.message,
        });
      } else {
        return state.merge({
          code: action.payload.code,
          sendOTPSuccess: true, loading: false, error: false,
        });
      }

    case types.SAVE_SIGNUP_PHONE:
      return state.merge({phone: action.payload})

    case types.RESET_OTP_SCREEN_SETTING:
      return state.merge({
        error: false,
        sendOTPSuccess: false,
        loading: false
      });

    case types.SOCIAL_SIGNUP_SAVE_PHONE_SUCCESS:
      if (action.payload.error) {
        return state.merge({
          loading: false, error: true,
          errorMessage: action.payload.message,
        });
      } else {
        // Update the stored data so that next time user won't see this screen
        const data = state.user;
        data.phone_verified = true;
        const authData = {jwt: state.jwt, data};
        AsyncStorage.setItem('@auth', JSON.stringify(authData));
        return state.merge({
          user: data,
          loading: false,
          error: false,
        });
      }

    case types.REGISTER_USER_FAILURE:
    case types.SEND_OTP_FAILURE:
    case types.SOCIAL_SIGNUP_SAVE_PHONE_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RESET_PASSWORD_FAILURE:
      return state.merge({
        error: true,
        errorMessage: action.payload.message
      });

    default:
      return state;
  }
};
