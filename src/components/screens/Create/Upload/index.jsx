import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CameraKitCamera} from 'react-native-camera-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../CreateStyles';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';

class UploadScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
    navBarHidden: true
  };

  state = {
    showPermissionError: true
  };

  async componentWillMount() {
    
  }

  render() {

    return (
      <View style={styles.uploadScreenContainer}>
        <Icon name="ios-cloud-upload-outline" size={200} color="white" />
        <Text style={styles.uploadScreenText}>
          We're processing your screens.
          {'\n'}
          (1/5)
        </Text>
        <ActivityIndicator style={{marginTop: 20}} color="white" size="large" />
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

export default connect(mapStateToProps, mapActionsToProps) (UploadScreen);
