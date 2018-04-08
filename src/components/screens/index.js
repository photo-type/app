import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import SignupScreen from './Signup';
import ListScreen from './List';
import CreateScreen from './Create';
import CreateCameraScreen from './Create/CameraScreen';
import UploadScreen from './Create/Upload';
import ReviewActionsScreen from './Create/ReviewActions';

export default (store, provider) => {
  // Auth Screens
  Navigation.registerComponent('App.LoginScreen', () => LoginScreen, store, provider);
  Navigation.registerComponent('App.SignupScreen', () => SignupScreen, store, provider);
  Navigation.registerComponent('App.ListScreen', () => ListScreen, store, provider);
  Navigation.registerComponent('App.CreateScreen', () => CreateScreen, store, provider);
  Navigation.registerComponent('App.CreateScreen.Camera', () => (
    CreateCameraScreen
  ), store, provider);
  Navigation.registerComponent('App.CreateScreen.Upload', () => (
    UploadScreen
  ), store, provider);
  Navigation.registerComponent('App.CreateScreen.ReviewActions', () => (
    ReviewActionsScreen
  ), store, provider);
}
