import {StyleSheet} from 'react-native';
import Dimensions from  'Dimensions';
const {height} = Dimensions.get('window');

var styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  cameraActionsWrap: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagesWrap: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 120,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageWrap: {
    marginRight: 5
  },
  imageIcon: {
    height: 50,
    width: 50,
    borderRadius: 5,
    opacity: 0.6
  },
  imageIconRemoveOverlay: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
});

export default styles;
