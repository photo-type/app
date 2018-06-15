import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet'
import Prompt from 'react-native-prompt';
import GettingReadyScreen from './GettingReadyScreen';
import RNFetchBlob from 'react-native-fetch-blob'
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { BUCKET_URL } from '../../../reducers';
import { createPrototype, getScreens, setCurrentPrototype } from '../../../reducers/create/create.actions';

class PlayScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    navBarHidden: true
  };

  state = {
    loading: true,
    processed: 0,
    selectedObj: {},
    errorLoading: false,
    base64Data: [],
    images: [],
  };

  componentDidMount() {
    this.props.getScreens().then(action => {
      this.setState({
        images: [...action.payload.screen].map((img, index) => {
          img.zIndex = index;
          return img;
        })
      })
      this.loadImages();
    });
  }

  async loadImages() {
    const images = this.state.images;
    const base64Data = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      try {
        const res = await RNFetchBlob.fetch('GET', `${BUCKET_URL}${image.path}`);
        if (res.info().status == 200) {
          base64Data.push(res.base64());
          console.log(base64Data);
          this.setState({processed: i + 1});
        }
      } catch (e) {
        console.log(e);
        return this.setState({errorLoading: true, loading: false});
      }
    }
    this.setState({base64Data, loading: false});
  }

  render() {
    const { loading, images, errorLoading, processed, base64Data } = this.state;
    console.log('this state images', loading);
    setScreen = (screenId) => {
      let imgz = [];
      imgz = this.state.images.map((img, index) => {
        let temp = img;
        temp.zIndex = index;
        if (temp._id == screenId) {
          temp.zIndex = 999
          console.log('it is TRUE!')
        }
        return temp;
      })
      this.setState({
        images: imgz
      })
    }

    return (
      <View style={{flex: 1}}>
        {
          !loading && !errorLoading &&
          <View style={{ height: '100%', width: '100%', position: 'relative' }}>
            {
              images.map((i, index) => (
                <View key={index} style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0, zIndex: i.zIndex }}>
                  {
                    <View style={{ flex: 1, height: '100%', width: '100%' }}>
                      {
                        i.actions.map((a, indx) => (
                          <TouchableOpacity
                            key={indx} onPress={() => {
                              setScreen(a.link)
                            }}
                            style={{
                              position: 'absolute', top: a.dimensions.y,
                              left: a.dimensions.x, zIndex: i.zIndex,
                              height: a.dimensions.height, width: a.dimensions.width,
                              backgroundColor: "#00b894", overflow: 'hidden',
                              maxWidth: a.dimensions.width, opacity: 0.3
                            }}
                          >
                            <Text style={{ color: '#fff' }}></Text>
                          </TouchableOpacity>
                        ))
                      }
                      <Image
                        style={{ height: '100%', width: '100%' }}
                        source={{ uri: `data:image/jpg;base64,${base64Data[index]}` }}
                      />
                    </View>
                  }
                </View>
              ))
            }
          </View>
        }
        {
          loading && !errorLoading &&
          <GettingReadyScreen loaded={parseInt((processed/images.length)*100) || 0} />
        }
        {
          errorLoading &&
          <View style={styles.uploadScreenContainer}>
            <Text style={styles.uploadScreenText}>
              Error occurred while loading screens. Please go back and try again!
            </Text>
          </View>
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
    getScreens: () => dispatch(getScreens())
  };
}

export default connect(mapStateToProps, mapActionsToProps)(PlayScreen);
