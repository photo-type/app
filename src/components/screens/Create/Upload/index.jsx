import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CameraKitCamera} from 'react-native-camera-kit';
import Upload from 'react-native-background-upload';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from '@remobile/react-native-toast';
import {API_URL} from '../../../../reducers';
import styles from '../CreateStyles';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';

class UploadScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
    navBarHidden: true
  };

  state = {
    showPermissionError: true,
    screensUploadCount: 0,
    uploadProgress: 0
  };

  async componentDidMount() {
    const {capturedImages, token, id} = this.props;
    for (let i = 0; i < capturedImages.length; i++) {
      try {
        console.log(capturedImages[i])
        const options = {
          url: `${API_URL}/prototypes/${id}/screens`,
          path: capturedImages[i].uri.replace('file:/', '/'),
          headers: {
            'Authorization': `Bearer ${token}`
          },
          method: 'POST',
          field: 'file',
          type: 'multipart',
          notification: {
            enabled: true
          }
        }
        const uploadedImage = await this.awaitifyUpload(options, i);
        this.setState({screensUploadCount: this.state.screensUploadCount + 1});
      } catch(err) {
        Toast.showLongTop('Error while uploading screen #' + (i + 1));
        console.log('Upload error!', err)
      }
    }
    //success
    //send
    this.props.navigator.pop();
  }

  awaitifyUpload = (options, i) => {
    return new Promise((resolve, reject) => {
      Upload.startUpload(options).then((uploadId) => {
        console.log('Upload started', uploadId)
        Upload.addListener('progress', uploadId, (data) => {
          this.setState({uploadProgress: (i * 100) + parseInt(data.progress)});
          console.log(`Progress: ${data.progress}%`)
        })
        Upload.addListener('error', uploadId, reject);
        Upload.addListener('cancelled', uploadId, reject);
        Upload.addListener('completed', uploadId, resolve);
      })
      .catch(reject);
    });
  };

  render() {
    const {capturedImages} = this.props;
    const {screensUploadCount, uploadProgress} = this.state;
    console.log(uploadProgress);
    return (
      <View style={styles.uploadScreenContainer}>
        <Icon name="ios-cloud-upload-outline" size={200} color="white" />
        <Text style={styles.uploadScreenText}>
          We're processing your screens. {parseInt(uploadProgress / (capturedImages.length))}%
          {'\n'}
          ({screensUploadCount}/{capturedImages.length})
        </Text>
        <ActivityIndicator style={{marginTop: 20}} color="white" size="large" />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.create,
    token: state.auth.jwt
  };
}

function mapActionsToProps(dispatch) {
  return {
    addImage: (image) => dispatch(addImage(image)),
    removeImage: (index) => dispatch(removeImage(index))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (UploadScreen);
