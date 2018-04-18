import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './ListScreenStyles';
import Prompt from 'react-native-prompt';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {createPrototype, listPrototypes, setCurrentPrototype} from '../../../reducers/create/create.actions';

class ListScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
    showDialog: false
  };

  componentDidMount() {
    this.props.listPrototypes();
  }

  handleCreatePrototype = (name) => {
    if (this.props.create.loading) return;
    this.props.createPrototype(name).then((action) => {
      if (!action.error) {
        this.setState({showDialog: false});
      }// Todo show error toast
    });
  };

  handlePrototypeSelected = (obj) => {
    this.props.setCurrentPrototype(obj._id);
    this.props.navigator.push({
      screen: 'App.CreateScreen',
      title: `${obj.name}: Add Screens`,
      passProps: {
        id: obj._id
      },
      backButtonTitle: 'Back'
    })
  };

  render() {
    const {showDialog} = this.state;
    const {create: {loading}, list: {data, loading: listLoading}} = this.props;

    return (
      <View style={styles.parentContainer}>
        <Text>under development</Text>
        <Prompt
          title={loading ? 'Processing....' : 'Enter the name of Prototype:'}
          placeholder="e.g Coffee App"
          defaultValue=""
          visible={ showDialog }
          submitText="Create"
          onCancel={() => {
            if (loading) return;
            this.setState({showDialog: false})
          }}
          onSubmit={this.handleCreatePrototype}
        />
        <TouchableOpacity
          onPress={() => this.setState({showDialog: true})}
        >
          <Text>Create prototype</Text>
        </TouchableOpacity>

        {
          listLoading &&
          <ActivityIndicator size="large" />
        }
        {
          data.map((obj) => (
            <TouchableOpacity
              onPress={() => this.handlePrototypeSelected(obj)}
            >
              <Text>{obj.name}</Text>
            </TouchableOpacity>
          ))
        }
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

export default connect(mapStateToProps, mapActionsToProps) (ListScreen);
