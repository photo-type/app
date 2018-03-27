import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Navigation } from "react-native-navigation";
import thunk from "redux-thunk";
import { apiMiddleware } from 'redux-api-middleware';
import jwtInterceptorMiddleware from './middlewares/jwtInterceptor';
import logger from 'redux-logger';
import reducers from "./reducers";
import * as authActions from "./reducers/auth/auth.actions";
import { appInitialized } from './reducers/app/app.actions';
import registerScreens from "./components/screens";
import { Platform } from "react-native";

// redux related book keeping
const createStoreWithMiddleware =
applyMiddleware(
  thunk, jwtInterceptorMiddleware, apiMiddleware, logger
)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// screen related book keeping
registerScreens(store, Provider);

// notice that this is just a simple class, it's not a React component
export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(authActions.checkAuthState());
  }

  onStoreUpdate() {
    const { root } = store.getState().app;
    // handle a root change
    // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'login':
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'App.LoginScreen'
        }
      });
      break;
      case 'after-login':
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'App.ListScreen'
        }
      });
      store.dispatch(appInitialized());
      break;
      default:
      console.error('Unknown app root');
    }
  }
}
