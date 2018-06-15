import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './ListScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet'
import Prompt from 'react-native-prompt';
import Toast from '@remobile/react-native-toast';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {createPrototype, listPrototypes, setCurrentPrototype, deletePrototype } from '../../../reducers/create/create.actions';
import {logout} from '../../../reducers/auth/auth.actions';

class ListScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
    showDialog: false,
    selectedObj: {}
  };

  componentDidMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.props.listPrototypes();
  }

  onNavigatorEvent = (event) => {
    if (event.type === "NavBarButtonPress" && event.id === 'logout') {
      this.props.logout();
    }
  };

  handleCreatePrototype = (name) => {
    if (!name) {
      return Toast.showLongTop('Name is required.');
    }
    if (name.length > 60) {
      return Toast.showLongTop('Name should not exceed 60 chars limit.');
    }
    if (this.props.create.loading) return;
    this.props.createPrototype(name).then((action) => {
      if (!action.error) {
        this.setState({showDialog: false});
        this.props.listPrototypes();
      } else {
        Toast.showLongTop('Error while creating Prototype, Try again.');
      }
    })
    .catch(() => {
      this.setState({showDialog: false});
      Toast.showLongTop('Error while creating Prototype, Try again.');
    });
  };

  handleAction = (obj, index) => {
    if (obj.addButton) {
      this.setState({showDialog: true});
    } else {
      this.ActionSheet.show();
      this.setState({selectedObj: obj});
    }
  };

  handleActionSheet = (index) => {
    switch(index) {
      case 0:
      this.deletePrototype(this.state.selectedObj);
      break;
      case 1:
      // prototype details
      this.handlePrototypeSelected(this.state.selectedObj);
      break;
      case 2:
      this.playSelectedPrototype(this.state.selectedObj);
      break;
      // play prototype
    }
  };
  deletePrototype=(obj)=>{
    this.props.deletePrototype(obj._id).then(action=>{
      if (!action.error) {
        Toast.showLongTop('You just deleted a prototype');
        this.props.listPrototypes();
      } else {
        Toast.showLongTop('Error while deleting Prototype, Try again.');
      }
    }).catch(e=>{
      Toast.showLongTop('Error while catching delete Prototype, Try again.');
    });
  }
  playSelectedPrototype =(obj)=>{
    this.props.setCurrentPrototype(obj._id)
    this.props.navigator.push({
      screen: 'App.PlayScreen',
      title: `Playing : ${obj.name}`,
      passProps:{
        _obj : obj
      },
      backButtonTitle:"End Demo"
    })
  }
  handlePrototypeSelected = (obj) => {
    this.props.setCurrentPrototype(obj._id);
    this.props.navigator.push({
      screen: 'App.CreateScreen',
      title: `${obj.name}: Screens`,
      passProps: {
        id: obj._id
      },
      backButtonTitle: 'Back'
    })
  };

  render() {
    const {showDialog} = this.state;
    const {create: {loading}, list: {data, loading: listLoading}} = this.props;
    const prototypesList = [ {addButton: true} ,...data];
    
    const rows = prototypesList.reduce((rows, item, idx) => {
      if(idx % 2 === 0 && idx > 0) 
        rows.push([]);
      rows[rows.length-1].push({i: (idx -1 ), ...item});
      return rows;
    }, [[]]);

    return (
      <View style={styles.parentContainer}>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'What would you like to do?'}
          options={['Delete Protoype', 'Prototype Details', 'Play Prototype', 'Cancel']}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          onPress={this.handleActionSheet}
        />
        {
          (!this.props.delete.loading && !listLoading) &&
          <ScrollView style={{marginBottom: data.length > 1 ? 50 : 0, flex: 1}}>
          {
            rows.map((cols, rowInd) => (
              <View style={styles.row} key={rowInd}>
                {
                  cols.map((obj, colInd) => (
                    <View style={styles.col} key={`${rowInd}_${colInd}`}>
                      <TouchableOpacity
                        onPress={() => this.handleAction(obj, obj.i - 1)}
                      >
                        {
                          obj.addButton &&
                          <View style={[styles.colWrap, styles.addIconWrap]}>
                            <Icon
                              name="ios-add-outline" size={100}
                              color="rgba(0, 0, 0, 0.2)"
                            />
                          </View>
                        }
                        {
                          !obj.addButton &&
                          <View style={styles.colWrap}>
                            <Image style={styles.image} source={{uri: obj.uri}} />
                            <View style={styles.imageOverlay}>
                              <Text style={styles.overlayText}>
                                {obj.name.toUpperCase()}
                              </Text>
                              <Text style={styles.screensCountText}>
                                {obj.screens.length} SCREENS
                              </Text>
                            </View>
                          </View>
                        }
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            ))
          }
        </ScrollView>
        }
        <Prompt
          title={loading ? 'Processing....' : 'Enter the name of Prototype:'}
          placeholder="e.g Coffee App *"
          defaultValue=""
          visible={ showDialog }
          submitText="Create"
          onCancel={() => {
            if (loading) return;
            this.setState({showDialog: false})
          }}
          onSubmit={this.handleCreatePrototype}
        />
        {
          (this.props.delete.loading || listLoading )&&
          <ActivityIndicator style={{marginTop: 50}} size="large" />
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
    listPrototypes: () => dispatch(listPrototypes()),
    logout: () => dispatch(logout()),
    deletePrototype: (s)=>dispatch(deletePrototype(s))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (ListScreen);
