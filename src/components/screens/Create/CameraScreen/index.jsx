import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CameraKitCamera } from 'react-native-camera-kit';
import styles from './CameraStyles';
import CameraAction from './CameraAction';
import Toast from '@remobile/react-native-toast';
import ImageResizer from 'react-native-image-resizer';
import ActionButton from '../ActionButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { addImage, removeImage } from '../../../../reducers/create/create.actions';

class CreateScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPermissionError: true,
      wasMounted: false
    };
  }

  static navigatorStyle = {
    backButtonTitle: '',
    navBarHidden: true
  };

  async componentWillMount() {
    const isCameraAuthorized = await CameraKitCamera.checkDeviceCameraAuthorizationStatus();
    if (!isCameraAuthorized || isCameraAuthorized == -1) {
      const isUserAuthorizedCamera = await CameraKitCamera.requestDeviceCameraAuthorization();
      if (!isUserAuthorizedCamera) {
        Toast.showLongTop('Please allow Phototype to access your Camera');
      }
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    switch(event.id) {
      case 'willAppear':
        if (this.state.wasMounted) {
          this.props.navigator.pop();
        }
        break;
      case 'willDisappear':
        this.setState({wasMounted: true});
        break;
    }
  };

  takePhoto = async () => {
    try {
      const image = await this.camera.capture(true);
      const compressedImage = await ImageResizer.createResizedImage(image.uri, image.width, image.height, 'JPEG', 65);
      console.log(compressedImage);
      this.props.addImage(compressedImage);
    } catch (e) {
      //TODO: show toast message
      console.log(e);
      Toast.showLongTop('Error while compressing image');
    }
  };

  changeCamera = async () => {
    const success = await this.camera.changeCamera();
  };

  close = () => {
    this.props.navigator.pop();
  };

  render() {
    const { showPermissionError } = this.state;
    const { capturedImages } = this.props;

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
                flashMode: 'off',             // on/off/auto(default)
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
                      <Image source={{ uri: image.uri }} style={styles.imageIcon} />
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
              {

                <CameraAction
                  position="right" action="changeCamera"
                  handleTap={() => {
                    if (capturedImages.length > 0)
                      this.props.navigator.push({
                        screen: 'App.CreateScreen.Upload',
                      })
                    else {
                      Toast.showLongTop('Please, Take some photos first');
                    }
                  }}
                />
              }

            </View>
          </View>
        }

      </View>
    );
  }
}

function mapStateToProps(state) {
  return { ...state.create };
}

function mapActionsToProps(dispatch) {
  return {
    addImage: (image) => dispatch(addImage(image)),
    removeImage: (index) => dispatch(removeImage(index))
  };
}

export default connect(mapStateToProps, mapActionsToProps)(CreateScreen);
