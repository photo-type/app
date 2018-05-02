import React, {Component} from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './CreateStyles';
import ActionButton from './ActionButton';
import {removeImage, getScreens} from '../../../reducers/create/create.actions';
import {BUCKET_URL} from '../../../reducers';
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

  async componentDidMount() {
    this.props.getScreens();
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
    const images = [ {addButton: true} ,...this.props.screens.data];
    const rows = images.reduce((rows, item, idx) => {
      if(idx % 2 === 0 && idx > 0) rows.push([]);
      rows[rows.length-1].push({i: (idx -1 ), ...item});
      return rows;
    }, [[]]);

    return (
      <View style={styles.parentContainer}>
        {
          !this.props.screens.loading &&
          <ScrollView style={{marginBottom: images.length > 1 ? 50 : 0, flex: 1}}>
            {
              rows.map((cols, rowInd) => (
                <View style={styles.row} key={rowInd}>
                  {
                    cols.map((obj, colInd) => (
                      <View style={styles.col} key={`${rowInd}_${colInd}`}>
                        {
                          obj.addButton &&
                          <TouchableOpacity
                            onPress={() => this.handleAction(obj, obj.i - 1)}
                          >
                            <View style={[styles.colWrap, styles.addIconWrap]}>
                              <Icon
                                name="ios-add-outline" size={100}
                                color="rgba(0, 0, 0, 0.2)"
                              />
                            </View>
                          </TouchableOpacity>
                        }
                        {
                          !obj.addButton &&
                          <View style={styles.colWrap}>
                            <Image
                              style={styles.image}
                              source={{uri: `${BUCKET_URL}${obj.path}`}}
                            />
                            <View style={styles.imageOverlay}>
                              <TouchableOpacity
                                onPress={() => this.props.navigator.push({
                                  screen: 'App.CreateScreen.ReviewActions',
                                  title: 'Create Prototype',
                                  backButtonTitle: '',
                                  passProps: {
                                    ...obj
                                  }
                                })}
                              >
                                <Icon
                                  name="ios-create-outline" size={50}
                                  color="rgba(255, 255, 255, 1)"
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => this.handleAction(obj, obj.i - 1)}
                              >
                                <Icon name="ios-close-outline" size={70} color="rgba(255, 255, 255, 1)" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      </View>
                    ))
                  }
                </View>
              ))
            }
          </ScrollView>
        }
        {
          this.props.screens.loading &&
          <ActivityIndicator style={{marginTop: 50}} size="large" />
        }
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
    screens: state.create.screens
  };
}

function mapActionsToProps(dispatch) {
  return {
    removeImage: (i) => dispatch(removeImage(i)),
    getScreens: () => dispatch(getScreens())
  };
}

export default connect(mapStateToProps, mapActionsToProps) (CreateScreen);
