import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './SignupStyles';
import validator from 'validator';
import { TextField } from 'react-native-material-textfield';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {registerUser}  from '../../../reducers/auth/auth.actions';

class SignupScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
    navBarHidden: true,
    tabBarHidden: true,
  };

  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: ''
  };

  componentWillMount() {
  }

  signupUser = () => {
    const { password, email, name } = this.state;
    const {loading} = this.props;
    if (password && email && name && password.length > 4 && validator.isEmail(email)) {
      this.setState({error: ''});
      this.props.registerUser({email, name, password}).then(action => {
        if (action.payload.success) {
          this.props.navigator.pop() //back to login
        }
      });
    } else {
      this.setState({error: 'All fields are required!'});
    }
  };

  render() {
    const { loading, error, errorMessage } = this.props;
    const { password, name, confirmPassword, email, error: sError } = this.state;

    return (
      <ScrollView style={styles.parentContainer}>
        <View style={styles.heading}><Text style={styles.headingText}>Phototype</Text></View>
        <View style={styles.fieldsWrapper}>
          <View style={styles.fields}>
            <Text style={styles.fieldsHeading}>Signup to get a {'\n'}Phototype account</Text> 
            {
              error &&
              <Text style={styles.errorBox}>{errorMessage}</Text>
            }
            {
              sError &&
              <Text style={styles.errorBox}>{sError}</Text>
            }
            <View>
              <TextField
                style={styles.mgBt}
                fontSize={16}
                labelFontSize={16}
                autoCorrect={false}
                error={name && name.length < 3 ? "Please input correct name." : "" }
                baseColor="#D5D7DD"
                tintColor="#50C3C7"
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='Full Name (*)'
                value={name}
                onChangeText={ (name) => this.setState({name}) }
              />
              <TextField
                style={styles.mgBt}
                fontSize={16}
                labelFontSize={16}
                error={email && !validator.isEmail(email) ? "Please input correct email." : "" }
                baseColor="#D5D7DD"
                tintColor="#50C3C7"
                autoCorrect={false}
                autoCapitalize="none"
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='E-mail (*)'
                value={email}
                onChangeText={ (email) => this.setState({email }) }
              />
              <TextField
                fontSize={16}
                labelFontSize={16}
                tintColor="#50C3C7"
                baseColor="#D5D7DD"
                autoCapitalize="none"
                autoCorrect={false}
                error={password && (password.length < 5) ? "Please input at least 5 characters." : "" }
                secureTextEntry={true}
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='Password (*)'
                value={password}
                onChangeText={ (password) => this.setState({ password }) }
              />
              <TextField
                fontSize={16}
                labelFontSize={16}
                tintColor="#50C3C7"
                autoCapitalize="none"
                autoCorrect={false}
                error={confirmPassword && (confirmPassword != password) ? "Both passwords does not match." : "" }
                baseColor="#D5D7DD"
                secureTextEntry={true}
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='Confirm Password (*)'
                value={confirmPassword}
                onChangeText={ (confirmPassword) => this.setState({ confirmPassword }) }
              />
              <TouchableOpacity onPress={this.signupUser} style={styles.loginButton}>
                {
                  loading &&
                  <ActivityIndicator />
                }
                {
                  !loading && 
                  <Text style={styles.loginButtonText}>
                    SIGNUP
                  </Text>
                }
              </TouchableOpacity>
            </View>       
            <TouchableOpacity
              onPress={() => this.props.navigator.pop()}
              style={styles.forgotPasswordContainer}
            >
              <Text style={styles.forgotPasswordText}>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoWrap}>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.auth
  };
}

function mapActionsToProps(dispatch) {
  return {
    registerUser: (o) => dispatch(registerUser(o))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (SignupScreen);
