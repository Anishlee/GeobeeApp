import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {Button} from 'native-base';

import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';

class AppleSignInTest extends Component {
  constructor() {
    super();

    this.authCredentialListener = null;
    this.user = null;
    this.state = {
      credentialStateForUser: -1,
    };
  }

  componentDidMount() {
    this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
      console.log('Credential Revoked for the users');

      this.fetchAndUpdateCredentialState().catch((error) => {
        return this.setState({
          credentialStateForUser: `Error on the credential Update with code ${error.code}`,
        });
      });
    });

    this.fetchAndUpdateCredentialState()
      .then((response) => {
        return this.setState({credentialStateForUser: response});
      })
      .catch((error) => {
        return this.setState({
          credentialStateForUser: `Error have occurred with code ${error.code}`,
        });
      });
  }

  componentWillUnmount() {
    this.authCredentialListener();
  }

  signIn = async () => {
    console.log('Begining Apple ');

    try {
      debugger;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      this.props.navigation.navigate('QuizDashboard');

      console.log('Apple Auth Request Response ', appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        identityToken,
        realUserStatus,
      } = appleAuthRequestResponse;

      this.user = newUser;

      this.fetchAndUpdateCredentialState()
        .then((response) => {
          return this.setState({credentialStateForUser: response});
        })
        .catch((error) => {
          return this.setState({
            credentialStateForUser: `Error have occurred with code ${error.code}`,
          });
        });

      if (identityToken) {
        console.log('Apple Sign In Identity Token is ', identityToken);
        this.props.navigation.navigate('QuizDashboard');
      } else {
        console.log('Sign In via Apple is failed');
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        console.log('The user is an authentic real user profile');
        this.props.navigation.navigate('QuizDashboard');
      }

      console.log(
        `Apple authentication is completed for ${this.user} with email id ${email}`,
      );
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.error(JSON.stringify(error));
        console.log('User Sign In for Apple is canceled');
      } else {
        console.error(JSON.stringify(error));
      }
    }
  };

  fetchAndUpdateCredentialState = async () => {
    if (this.user === null) {
      this.setState({credentialStateForUser: 'N/A'});
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(
        this.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        this.setState({credentialStateForUser: 'AUTHORIZED'});
      } else {
        this.setState({credentialStateForUser: credentialState});
      }
    }
  };

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <AppleButton
          style={styles.appleButton}
          cornerRadius={5}
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          onPress={() => this.signIn()}
        />
      </View>
    );
  }
}
//<AppleSignInTest />
export default class HomePage extends Component {
  static navigationOptions = {
    title: 'Home Page',
  };
  render() {
    return (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff'}}>
            <FastImage
              style={{
                width: '100%',
                height: '17.5%',
                marginBottom: '10%',
                marginTop: '50%',
                marginLeft: '1.5%',
              }}
              source={require('./amountOfQuestions/Logo1.png')}
            />
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                {'Play'}
              </Text>
            </Button>
            <Text style={{marginBottom: 450}}></Text>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#73c7ab',
          }}>
          <Image
            style={{backgroundColor: '#73c7ab', height: 60}}
            source={require('../assets/map_patternd.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
  },
  StyleforButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4EA688',
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 20,
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: '5%',
    marginTop: '5%',
  },
  appleButton: {
    marginTop: '-1%',
    width: '80%',
    height: 60,
  },
  container: {backgroundColor: '#ffffff'},
  horizontal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
