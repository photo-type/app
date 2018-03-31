import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import SignupScreen from './Signup';
import ListScreen from './List';

export default (store, provider) => {
  // Auth Screens
  Navigation.registerComponent('App.LoginScreen', () => LoginScreen, store, provider);
  Navigation.registerComponent('App.SignupScreen', () => SignupScreen, store, provider);
  Navigation.registerComponent('App.ListScreen', () => ListScreen, store, provider);
}
