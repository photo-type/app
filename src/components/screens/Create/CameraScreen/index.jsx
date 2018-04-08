import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CameraKitCamera} from 'react-native-camera-kit';
import styles from './CameraStyles';
import CameraAction from './CameraAction';
import ActionButton from '../ActionButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {addImage, removeImage} from '../../../../reducers/create/create.actions';

class CreateScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    navBarHidden: true
  };

  state = {
    showPermissionError: true
  };

  async componentWillMount() {
    const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
    console.log(isCameraAuthorized);
    if (!isCameraAuthorized || isCameraAuthorized == -1) {
      const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();
      console.log(isUserAuthorizedCamera);
    }
  }

  takePhoto = async () => {
    try {
      const image = await this.camera.capture(true);
      this.props.addImage(image);
    } catch (e) {
      //TODO: show toast message
    }
  };

  changeCamera = async () => {
    const success = await this.camera.changeCamera();
  };

  close = () => {
    this.props.navigator.pop();
  };

  render() {
    const {showPermissionError} = this.state;
    const {capturedImages} = this.props;

    return (
      <View style={styles.parentContainer}>
        {
          showPermissionError &&
          <View style={styles.parentContainer}>
            <CameraKitCamera
              ref={cam => this.camera = cam}
              style={{
                flex: 1,
                backgroundColor: 'white'
              }}
              cameraOptions={{
                flashMode: 'auto',             // on/off/auto(default)
                focusMode: 'on',               // off/on(default)
                zoomMode: 'on',                // off/on(default)
                ratioOverlayColor: '#00000077' // optional
              }}
            />
            <View style={styles.imagesWrap}>
              <ScrollView horizontal={true}> 
                {
                  capturedImages.map((image, index) => (
                    <TouchableOpacity
                      onPress={() => this.props.removeImage(index)}
                      key={image.id} style={styles.imageWrap}
                    >
                      <View style={styles.imageIconRemoveOverlay}>
                        <Icon name="ios-close" size={50} color="white" />
                      </View>
                      <Image source={{uri: image.uri}} style={styles.imageIcon} />
                    </TouchableOpacity>
                  ))
                }
              </ScrollView>
            </View>

            <View style={styles.cameraActionsWrap}>
              <CameraAction
                position="left" action="close"
                handleTap={this.close}
              />

              <CameraAction
                position="center" action="takePhoto"
                handleTap={this.takePhoto}
              />

              <CameraAction
                position="right" action="changeCamera"
                handleTap={this.changeCamera}
              />
              
            </View>
          </View>
        }
        
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {...state.create};
}

function mapActionsToProps(dispatch) {
  return {
    addImage: (image) => dispatch(addImage(image)),
    removeImage: (index) => dispatch(removeImage(index))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (CreateScreen);
