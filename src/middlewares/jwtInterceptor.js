import { CALL_API } from 'redux-api-middleware';
import { API_URL } from '../reducers';
import { AsyncStorage } from 'react-native';
import { Navigation } from "react-native-navigation";

// :(
const startOver = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'App.LoginScreen'
    }
  });
};

export default ({ getState }) => next => action => {
  const callApi = action[CALL_API];
  // Check if this action is a redux-api-middleware action.
  if (callApi) {
    const { auth } = getState();
    // Prepend API base URL to endpoint if it does not already contain a valid base URL.
    if (!/^((http|https|ftp):\/\/)/i.test(callApi.endpoint)) {
      callApi.endpoint = `${API_URL}${callApi.endpoint}`;
    }

    // Set headers to empty object if undefined.
    if (!Object.keys(callApi.headers || {}).length) {
      callApi.headers = {};
    }

    // Set Content-Type to application/json if Content-Type does not already have a value.
    if (!callApi.headers['Content-Type']) {
      callApi.headers['Content-Type'] = 'application/json';
    }

    // add token in every call execpt that call which have No-Auth header
    if (!callApi.headers['NO-AUTH']) {
      if (auth.jwt) {
        // if there is token apply it
        callApi.headers = Object.assign({}, callApi.headers, {
          Authorization: `Bearer ${auth.jwt}`,
        });
      } else {
        //we can't proceed. Move to login state.
        startOver();
      }
    } else {
      // delete that header because its not valid one ;)
      delete callApi.headers['NO-AUTH'];
    }

    // add response interceptor to watch on 401 unauthorized calls
    const type = callApi.types[2];
    callApi.types[2] = {
      type,
      payload: (action, state, res) => {
        if (res.status == 401) {
          // dude you've no access. Pity, gonna remove you
          AsyncStorage.removeItem('@auth');
          startOver();
        }
        return res.json();
      }
    }

  }

  // Pass the FSA to the next action.
  return next(action || {});
};
