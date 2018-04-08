import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './ReviewActionsStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import {Gestures, GestureView} from 'react-native-gestures';

class ReviewActionsScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
    navBarHidden: true
  };

  state = {
    overlays: []
  };

  async componentWillMount() {
    
  }

  handleOnTap = () => {
    this.state.overlays.push(() => (
      <GestureView
        style={{
          backgroundColor: 'green',
          position: 'absolute',
          opacity: 0.5,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          width: 188,
          height: 51,
        }}
        gestures={[Gestures.drag, Gestures.pinch]}
      />
    ));
    this.setState({overlays: this.state.overlays});
  };

  render() {
    const {overlays} = this.state;
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.uri}}
          style={{height: '100%', width: '100%'}}
        />
        <View style={styles.overlayView}>
          {
            overlays.map((OverlayComponent, i) => <OverlayComponent key={i} />)
          }
          <TouchableOpacity onPress={this.handleOnTap} style={styles.addButton}>
            <Icon name="ios-add-outline" size={40} color="white" />
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapActionsToProps) (ReviewActionsScreen);
