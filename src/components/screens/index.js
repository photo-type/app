import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import ListScreen from './List';

export default (store, provider) => {
  // Auth Screens
  Navigation.registerComponent('App.LoginScreen', () => LoginScreen, store, provider);
  Navigation.registerComponent('App.ListScreen', () => ListScreen, store, provider);
}
