import {StyleSheet} from 'react-native';
import Dimensions from  'Dimensions';
const {height} = Dimensions.get('window');

var styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
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
