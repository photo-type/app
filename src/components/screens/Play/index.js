import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet'
import Prompt from 'react-native-prompt';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { createPrototype, listPrototypes, setCurrentPrototype } from '../../../reducers/create/create.actions';

class PlayScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
    showDialog: false,
    selectedObj: {}
  };
  componentDidMount() {
    this.props.listPrototypes();
    console.log('Debug this',this.props._obj)
  }
  handleAction = (obj, index) => {
    if (obj.addButton) {
      this.setState({ showDialog: true });
    } else {
      this.ActionSheet.show();
      this.setState({ selectedObj: obj });
    }
  };
  render() {
    const { showDialog } = this.state;
    const { create: { loading }, list: { data, loading: listLoading } } = this.props;
    const prototypesList = [{ addButton: true }, ...data];

    const rows = prototypesList.reduce((rows, item, idx) => {
      if (idx % 2 === 0 && idx > 0) rows.push([]);
      rows[rows.length - 1].push({ i: (idx - 1), ...item });
      return rows;
    }, [[]]);

    return (
      <View>
        <Text>Play view works! </Text>
        {/* <Image source={}/> */}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.create
  };
}

function mapActionsToProps(dispatch) {
  return {
    createPrototype: (s) => dispatch(createPrototype(s)),
    setCurrentPrototype: (s) => dispatch(setCurrentPrototype(s)),
    listPrototypes: () => dispatch(listPrototypes())
  };
}

export default connect(mapStateToProps, mapActionsToProps)(PlayScreen);
