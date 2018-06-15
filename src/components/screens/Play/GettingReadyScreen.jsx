import React, {Component} from 'react';
import styles from './PlayScreenStyles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {View, ActivityIndicator, Text} from 'react-native';

const GettingReadyScreen = ({loaded}) => (
  <View style={styles.uploadScreenContainer}>
    <AnimatedCircularProgress
      size={200}
      width={10}
      fill={loaded}
      tintColor="#00e0ff"
      backgroundColor="#3d5875"
    />
    <Text style={styles.uploadScreenText}>
      {'\n'}
      We're loading your prototype!
    </Text>
    <Text style={[styles.uploadScreenText, {fontSize: 14}]}>
      This can take a while depending upon{'\n'} your Internet speed
    </Text>
    <Text style={styles.uploadScreenText}>
      {loaded}%
    </Text>
  </View>
);

export default GettingReadyScreen;