import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './ListScreenStyles';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';

class ListScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
  };

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text>under development</Text>
        <TouchableOpacity
          onPress={() => this.props.navigator.push({
            screen: 'App.CreateScreen',
            title: 'Create Prototype',
            backButtonTitle: ''
          })}
        >
          <Text>Create prototype</Text>
        </TouchableOpacity>
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
