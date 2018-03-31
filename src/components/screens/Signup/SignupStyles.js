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
    flexDirection: 'column'
  },
  heading: {
    flex: 1,
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    fontSize: 32,
    color: 'white',
    letterSpacing: 0.55
  },
  fieldsWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fieldsHeight: {
    height: 450
  },
  fields: {
    minHeight: 404,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'white',
    width: 300,
    borderRadius: 10,
    paddingBottom: 80,
    marginBottom: 80
  },
  fieldsHeading: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    color: '#2B3857',
    marginTop: 40,
    marginBottom: 20
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poweredByText: {
    left: 49,
    top: 9,
    fontSize: 16,
    color: 'white',
    letterSpacing: 0.36,
  },
  loginButton: {
    elevation: 20,
    marginTop: 25,
    backgroundColor: '#2D2E3A',
    width: 234,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 50,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 0.5
  },
  forgotPasswordContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 30,
  },
  forgotPasswordText: {
    textAlign: 'center',
    color: '#2B3857',
    opacity: 0.6,
  },
  mgBt: {
    marginBottom: 30,
  },
  errorBox: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'red',
    color: 'red',
    marginBottom: 10,
  }
});

export default styles;
