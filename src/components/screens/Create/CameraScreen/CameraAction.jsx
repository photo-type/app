import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CircleIcon from 'react-native-vector-icons/FontAwesome';
import styles from './CameraStyles';

const CameraAction = ({action, handleTap, position}) => {
  const iconMapper = {
    changeCamera: {
      name: 'ios-reverse-camera',
      size: 50,
      color: 'rgba(255, 255, 255, 0.6)',
      flex: 1
    },
    takePhoto: {
      name: 'circle',
      size: 90,
      color: 'rgba(255, 255, 255, 0.6)',
      flex: 2
    },
    close: {
      name: 'ios-close-circle-outline',
      size: 50,
      color: 'rgba(255, 255, 255, 0.6)',
      flex: 1
    }
  }
  return (
    <View style={{flex: iconMapper[action].flex, alignItems: 'center'}}>
      <TouchableOpacity onPress={handleTap}>
        {
          action === 'takePhoto' &&
          <CircleIcon {...iconMapper[action]} />
        }
        {
          action !== 'takePhoto' &&
          <Icon {...iconMapper[action]} />
        }
      </TouchableOpacity>
    </View>
  )
};

export default CameraAction;