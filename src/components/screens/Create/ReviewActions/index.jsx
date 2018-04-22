import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import styles from './ReviewActionsStyles';
import ActionButton from '../ActionButton';
import Toast from '@remobile/react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import {updateScreen} from '../../../../reducers/create/create.actions';
import {View, ScrollView, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Gestures, GestureView} from 'react-native-gestures';
import {BUCKET_URL} from '../../../../reducers';

class ReviewActionsScreen extends Component {
  static navigatorStyle = {
    navBarHidden: true,
    backButtonTitle: 'Back',
    screenBackgroundColor: '#F3F8FE',
    navBarTextColor: '#2B3857',
    navBarButtonColor: '#2B3857'
  };

  ref = [];

  state = {
    overlays: [],
    showSelectScreen: false,
    selectedIndex: 0,
    selectedLink: '',
    dragging: false
  };

  componentWillMount() {
    this.state.overlays = [...this.props.actions].map(action => {
      const actionObj = action.asMutable();
      actionObj.dimensions = actionObj.dimensions.asMutable();
      return actionObj;
    });
  }

  handleSave = () => {
    this.props.updateScreen(
      this.props._id,
      {
        actions: this.state.overlays
      }
    )
    .then(action => {
      if (!action.error) {
        return this.props.navigator.pop();
      }
      Toast.showLongTop('Error occurred while saving..');
    });
  };

  handleOverlayTap = (i) => {
    const delay = Date.now() - this.state.touchStart;
    if (!this.state.dragging && delay > 500) {
      return this.setState({
        showSelectScreen: true,
        selectedIndex: i,
        dragging: false
      });
    }
    this.setState({dragging: false})
  }

  setOverlayDimension = (i, {width, height, x, y}) => {
    this.state.overlays[i].dimensions = {
      width, height, x, y
    }
    this.setState({overlays: this.state.overlays, dragging: true});
  };

  handleOnTap = () => {
    this.state.overlays.push({
      dimensions: {
        height: 50,
        width: 180,
        left: 0,
        top: 0
      },
      link: ''
    });
    this.setState({overlays: this.state.overlays});
  };

  getOverlay = (props) => {
    return (
      <GestureView
        onTouchStart={(e) => this.setState({touchStart: Date.now()})}
        onTouchEnd={() => this.handleOverlayTap(props.index)}
        key={props.index}
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          opacity: 0.7,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          height: props.data.dimensions.height,
          width: props.data.dimensions.width,
          left: props.data.dimensions.x,
          top: props.data.dimensions.y,
        }}
        onLayout={(layout) => {
          this.setOverlayDimension(props.index, layout);
          return {
            top: layout.y,
            left: layout.x,
            width: layout.width,
            height: layout.height,
            transform: [{rotate: `${layout.rotate}deg`}]
          };
        }}
        gestures={[Gestures.drag, Gestures.pinch]}
      >
        <Text style={{color: 'white', textAlign: 'center'}}>
          Long Press to {props.data.link ? 'Change' : 'Set Screen'} {'\n'}
          {props.data.link ? ('Current: ' + props.data.link) : ''}
        </Text>
      </GestureView>
    )
  };

  handleCloseScreen = () => {
    this.setState({
      showSelectScreen: false,
      selectedIndex: 0,
    });
  };

  renderSelectScreen() {
    const {overlays, selectedIndex} = this.state;
    const rows = [...this.props.screens.data].reduce((rows, item, idx) => {
      if(idx % 2 === 0 && idx > 0) rows.push([]);
      rows[rows.length-1].push({i: (idx -1 ), ...item});
      return rows;
    }, [[]]);
    const selectedLink = overlays[selectedIndex].link;

    return (
      <View style={styles.screenListContainer}>
        <ScrollView style={styles.scrollContainer}>
          <Text style={{textAlign: 'center'}}>Select a Screen to Link with your Action</Text>
          {
            rows.map((cols, rowInd) => (
              <View style={styles.row} on key={rowInd}>
                {
                  cols.map((obj, colInd) => (
                    <View style={styles.col} key={`${rowInd}_${colInd}`}>
                      <TouchableOpacity
                        onPress={() => {
                          overlays[selectedIndex].link = obj._id;
                          this.setState({
                            overlays 
                          })
                        }}
                      >
                        <View style={styles.colWrap}>
                          <Image
                            style={styles.image}
                            source={{uri: `${BUCKET_URL}${obj.path}`}}
                          />
                          {
                            selectedLink == obj._id &&
                            <View style={styles.imageOverlay}>
                              <Icon
                                name="ios-checkmark-outline" size={100}
                                color="rgba(255, 255, 255, 1)"
                              />
                            </View>
                          }
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </View>
            ))
          }
        </ScrollView>
        {
          selectedLink &&
          <ActionButton
            label="DONE" handleTap={this.handleCloseScreen}
          />
        }
      </View>
    )
  }

  render() {
    const {overlays, showSelectScreen} = this.state;
    const {updatingScreen} = this.props;

    return (
      <Fragment>
        {showSelectScreen && this.renderSelectScreen()}
        <View style={styles.container}>
          <Image
            source={{uri: `${BUCKET_URL}${this.props.path}`}}
            style={{height: '100%', width: '100%'}}
          />
          <View style={styles.overlayView}>
            {
              overlays.map((a, i) => {
                return this.getOverlay({data: a, index: i});
              })
            }
            {
              updatingScreen &&
              <ActivityIndicator
                color="#FFFFFF" size="large" style={styles.loader}
              />
            }
            <TouchableOpacity onPress={this.handleSave} style={styles.doneButton}>
              <Icon name="ios-checkmark-outline" size={50} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleOnTap} style={styles.addButton}>
              <Icon name="ios-add-outline" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {...state.create};
}

function mapActionsToProps(dispatch) {
  return {
    updateScreen: (id, obj) => dispatch(updateScreen(id, obj))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (ReviewActionsScreen);
