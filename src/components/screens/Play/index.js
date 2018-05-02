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
  constructor(props) {
    super(props);

  }
  static navigatorStyle = {
    backButtonTitle: '',
  };

  state = {
    showDialog: false,
    selectedObj: {},
    images:[],
    isFirst:true
  };
  componentWillReceiveProps(props){
    if(this.state.isFirst && props.screens.data.length){
    this.setState({
      images : [...props.screens.data].map((img,index)=>{
        let temp = img.asMutable();
        temp.zIndex= index;
        return temp; 
      }),
      isFirst:false
    })
  }

  }
  componentDidMount() {
    this.props.getScreens();
    this.setState({images:[...this.props.screens.data]})
    console.log("didmount",[...this.props.screens.data])
  }
  handleAction = (obj, index) => {
    if (obj.addButton) {
      this.setState({ showDialog: true });
    } else {
      this.ActionSheet.show();
      this.setState({ selectedObj: obj });
    }
  };
  setImages(){
    this.setState({
      images:[...this.props.screens.data]
    })
  }
  render() {
    console.log('this state images',this.state.images);    
    
    
    // if (this.props.screens.loading)
    //   return (
    //     <View></View>
    //   );
    const { showDialog } = this.state;
    const { create: { loading }, list: { data, loading: listLoading } } = this.props;
    const prototypesList = [{ addButton: true }, ...data];

  setScreen = (screenId)=>{
    let imgz=[];
    imgz = this.state.images.map((img,index)=>{
      let temp = img;
      temp.zIndex= index;
      if(temp._id==screenId)
        {
          temp.zIndex=999
          console.log('it is TRUE!')
        }
      return temp;
    })
    this.setState({
      images:imgz
    })
  }

    return (
      <View>
        {
          !this.props.screens.loading &&
          <View style={{ height: '100%', width: '100%', position:'relative' }}>
            {
              this.state.images.map((i, index) => (
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
