import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './LoginScreenStyles';
import { TextField } from 'react-native-material-textfield';
import {View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import {login}  from '../../../reducers/auth/auth.actions';

class LoginScreen extends Component {
  static navigatorStyle = {
    backButtonTitle: '',
    screenBackgroundColor: '#2D2E3A',
    navBarHidden: true,
    tabBarHidden: true,
  };

  state = {
    username: '',
    password: ''
  };

  loginUser = () => {
    const { password, username } = this.state;
    const {loading} = this.props;
    if (username && username.length > 3 && password) {
      this.props.login(username, password);
    }
  };

  render() {
    const { loading, error, errorMessage, registerUserSuccess } = this.props;
    const { password, username } = this.state;

    return (
      <View style={styles.parentContainer}>
        <View style={styles.heading}><Text style={styles.headingText}>Phototype</Text></View>
        <View style={styles.fieldsWrapper}>
          <View style={[styles.fields, (error || registerUserSuccess) ? styles.fieldsHeight : null]}>
            <Text style={styles.fieldsHeading}>Please log in with your {'\n'}Phototype account</Text> 
            {
              error &&
              <Text style={styles.errorBox}>{errorMessage}</Text>
            }
            {
              registerUserSuccess &&
              <Text style={styles.successBox}>
                Your account was created successfully, Please login to continue.
              </Text>
            }
            <View>
              <TextField
                style={styles.mgBt}
                fontSize={16}
                labelFontSize={16}
                autoCapitalize="none"
                autoCorrect={false}
                error={username && username.length < 3 ? "Please input correct username." : "" }
                baseColor="#D5D7DD"
                tintColor="#50C3C7"
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='E-mail'
                value={username}
                onChangeText={ (username) => this.setState({username }) }
              />
              <TextField
                fontSize={16}
                labelFontSize={16}
                tintColor="#50C3C7"
                baseColor="#D5D7DD"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                titleTextStyle={{fontFamily: 'AvenirNext-Regular'}}
                labelTextStyle={{fontFamily: 'AvenirNext-DemiBold', color: '#50C3C7'}}
                textColor="#2B3857"
                label='Password'
                value={password}
                onChangeText={ (password) => this.setState({ password }) }
              />
              <TouchableOpacity onPress={this.loginUser} style={styles.loginButton}>
                {
                  loading &&
                  <ActivityIndicator />
                }
                {
                  !loading && 
                  <Text style={styles.loginButtonText}>
                    LOGIN
                  </Text>
                }
              </TouchableOpacity>
            </View>       
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={() => {
                this.props.navigator.push({screen: 'App.SignupScreen'})
              }}
            >
              <Text style={styles.forgotPasswordText}>Dont have an account?</Text>
            </TouchableOpacity>
            <Text style={styles.forgotPasswordText1}>Forgot your password?</Text>
          </View>
        </View>
        <View style={styles.logoWrap}>
        </View>
      </View>
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
    login: (e, p) => dispatch(login(e, p))
  };
}

export default connect(mapStateToProps, mapActionsToProps) (LoginScreen);
