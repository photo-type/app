import {StyleSheet} from 'react-native';
import Dimensions from  'Dimensions';
const {height} = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenListContainer: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#F3F8FE',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 202
  },
  scrollContainer: {
    flex: 1, 
    marginTop: 50
  },
  overlayView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1
  },
  addButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2E3A',
    position: 'absolute',
    zIndex: 2,
    bottom: 15,
    right: 15,
    borderRadius: 50
  },
  doneButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D2E3A',
    position: 'absolute',
    zIndex: 2,
    bottom: 15,
    left: 15,
    borderRadius: 50
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    zIndex: 99,
    backgroundColor: 'rgba(0, 0, 0, .7)'
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
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
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

  uploadScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  uploadScreenText: {
    fontSize: 24,
    fontWeight: '300',
    textAlign: 'center',
    marginTop: -20,
    color: 'white'
  }
});

export default styles;
