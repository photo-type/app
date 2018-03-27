import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './ListScreenStyles';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';

class ListScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
  };

  state = {
  };

  componentWillMount() {
  }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text>under development</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapActionsToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapActionsToProps) (ListScreen);
