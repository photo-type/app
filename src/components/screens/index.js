import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';

export default (store, provider) => {
  // Auth Screens
  Navigation.registerComponent('App.LoginScreen', () => LoginScreen, store, provider);
}
