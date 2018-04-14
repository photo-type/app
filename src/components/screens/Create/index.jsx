import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './CreateStyles';
import ActionButton from './ActionButton';
import {removeImage} from '../../../reducers/create/create.actions';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';

class CreateScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: 'Back',
    screenBackgroundColor: '#F3F8FE',
    navBarTextColor: '#2B3857',
    navBarButtonColor: '#2B3857'
  };

  state = {
    images: [],
    showCamera: true
  };

  async componentWillMount() {
    
  }

  handleAction = (obj, index) => {
    if (obj.addButton) {
      this.props.navigator.push({
        screen: 'App.CreateScreen.Camera',
        title: 'Create Prototype'
      })
    } else {
      this.props.navigator.push({
        screen: 'App.CreateScreen.ReviewActions',
        title: 'Create Prototype',
        passProps: {
          ...obj
        }
      })
      // this.props.removeImage();
    }
  };

  render() {
    const {showCamera} = this.state;
    const images = [ {addButton: true} ,...this.props.images];
    
    const rows = images.reduce((rows, item, idx) => {
      if(idx % 2 === 0 && idx > 0) rows.push([]);
      rows[rows.length-1].push({i: (idx -1 ), ...item});
      return rows;
    }, [[]]);

    return (
      <View style={styles.parentContainer}>
        <ScrollView style={{marginBottom: images.length > 1 ? 50 : 0, flex: 1}}>
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
                              <Icon name="ios-close-outline" size={100} color="rgba(255, 255, 255, 0.5)" />
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
        {
          images.length > 1 &&
          <ActionButton
            label="UPLOAD" handleTap={() => this.props.navigator.push({
            screen: 'App.CreateScreen.Upload',
            })}
          />
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    images: state.create.capturedImages
  };
}

function mapActionsToProps(dispatch) {
  return {
    removeImage: (i) => dispatch(removeImage(i))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (CreateScreen);
