import {StyleSheet} from 'react-native';
import Dimensions from  'Dimensions';
const {height} = Dimensions.get('window');

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height
  },
  parentContainer: {
    flex: 1,
    // flexDirection: 'column'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  col: {
    width: '50%',
    alignItems: 'center',
  },
  colWrap: {
    height: 200,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  addIconWrap: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
  },
  image: {
    height: '100%',
    borderRadius: 5,
    width: '100%'
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    marginBottom: 5
  },
  screensCountText: {
    color: 'white',
    fontSize: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    },
  }
});

export default styles;
