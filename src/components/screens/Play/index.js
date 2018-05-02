import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './PlayScreenStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionSheet from 'react-native-actionsheet'
import Prompt from 'react-native-prompt';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { BUCKET_URL } from '../../../reducers';
import { createPrototype, getScreens, setCurrentPrototype } from '../../../reducers/create/create.actions';

class PlayScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
    showDialog: false,
    selectedObj: {}
  };
  componentDidMount() {
    this.props.getScreens();
    console.log('Debug this', ...this.props.screens.data)
    console.log(BUCKET_URL);
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
    // if (this.props.screens.loading)
    //   return (
    //     <View></View>
    //   );
    const { showDialog } = this.state;
    let images = [];
    const { create: { loading }, list: { data, loading: listLoading } } = this.props;
    const prototypesList = [{ addButton: true }, ...data];

    images = [...this.props.screens.data];
    // const rows= images.reduce((rows,item,idx)=>{
    //   rows.push(...item)
    //   return rows;
    // })
    if(!this.props.screens.loading)
  {  
    this.props.screens.loading=true;
    images = images.map((img,index)=>{
      let temp = img.asMutable();
      temp.zIndex= index;
      console.log('loging actions',img.actions);
      return temp; 
    })
    this.props.screens.loading=false;
  }
  setScreen = (screenId)=>{
    console.log("inputed screenid", screenId)
    images =images.map((img,index)=>{
      let temp = img;
      temp.zIndex= index;
      console.log("screen ids", temp._id)
      if(temp._id===screenId)
        {
          temp.zIndex=999
          console.log('it is TRUE!')
        }
      return temp;
    })
    this.setState({
      state: this.state
    });
  }
    console.log('loading', this.props.screens.loading);
    console.log('console logging images', images);
    return (
      <View>
        {
          !this.props.screens.loading &&
          <View style={{ height: '100%', width: '100%', position:'relative' }}>
            {
              images.map((i, index) => (
                <View style={{ height: '100%', width: '100%' ,position:'absolute',top:0,left:0, zIndex: i.zIndex}}>
                  { 

                    <View style={{ flex: 1, height: '100%', width: '100%' }}>
                    {
                      i.actions.map((a,indx)=>(
                          <TouchableOpacity onPress={()=>{
                            setScreen(a.link)
                          }} style={{position:'absolute',top:a.dimensions.y,left:a.dimensions.x, zIndex:i.zIndex, height:a.dimensions.height,width:a.dimensions.width, backgroundColor:"#00b894",overflow:'hidden',maxWidth:a.dimensions.width, opacity:0.5}}><Text style={{color:'#fff'}}>{a.link}</Text></TouchableOpacity>

                    ))
                    }
                      {/* <Text style={{flex:1}} >{index}</Text> */}
                      <Image style={{ height: '100%', width: '100%'}} source={{ uri: `${BUCKET_URL}${i.path}` }} />
                      
                    </View>
                  }
                </View>
              ))
            }
            {/* images.forEach(i =>
            <Image source={{ uri: `${BUCKET_URL}${i.path}` }} />
            ) */}
          </View>
        }
        {/* {
          <View>
            <Image source={{ uri: `${BUCKET_URL}${images[0].path}` }} />
          </View>

        } */}
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
