/*class AppleSignInTest extends Component {
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
      //console.log('Credential Revoked for the users');

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
    //console.log('Begining Apple ');

    try {
      debugger;
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      this.props.navigation.navigate('QuizDashboard');

      //console.log('Apple Auth Request Response ', appleAuthRequestResponse);

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
        //console.log('Apple Sign In Identity Token is ', identityToken);
        this.props.navigation.navigate('QuizDashboard');
      } else {
        //console.log('Sign In via Apple is failed');
      }

      if (realUserStatus === appleAuth.UserStatus.LIKELY_REAL) {
        //console.log('The user is an authentic real user profile');
        this.props.navigation.navigate('QuizDashboard');
      }

      //console.log(
        `Apple authentication is completed for ${this.user} with email id ${email}`,
      );
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.error(JSON.stringify(error));
        //console.log('User Sign In for Apple is canceled');
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
//<AppleSignInTest />*/

import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, ScrollView, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Dimensions} from 'react-native';
import {Button} from 'native-base';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Home Page',
  };
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      setloggedIn: false,
      userInfo: null,
      setUserInfo: [],
    };
  }
  /*onAuthStateChanged(user) {
    this.setState({userInfo: user});
    //console.log(user);
    if (user) {
      this.setState({loggedIn: true});
    }
  }*/
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['email'],
      // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '647666075800-46h7rjimhm9du40cvhug8jus5u6fjguv.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    //const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //return subscriber; // unsubscribe on unmount
  }

  componentDidUpdate() {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '647666075800-46h7rjimhm9du40cvhug8jus5u6fjguv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      const {accessToken, idToken, user} = signInResponse;
      this.setState({userInfo: user});
      //console.log(user);
      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential);
      this.setState({loggedIn: true});
      this.props.navigation.navigate('Dashboard', {user: user, isUser: true});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert(
          'You have canceled the sign-in with google process. Would you like to try again?',
          '',
          [
            {
              text: 'Yes',
              onPress: () => this.signIn(), style: 'default'
            },
            {
              text: 'No',
              onPress: () => Alert.alert(
                'Have a good day!',
                '',
                [
                  {
                    text: 'Ok',
                    style: 'default'
                  },
                ],
                {cancelable: true},
                //clicking out side of alert will not cancel
              ),
              style: 'destructive'
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert(
          'You are already being signed in',
          '',
          [
            {
              text: 'Ok',
              style: 'default'
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Your google play services are outdated or not available.',
          '',
          [
            {
              text: 'Ok',
              style: 'destructive'
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        );
        // play services not available or outdated
      } else {
        // some other error happened

        console.error(error);
      }
    }
  };
  playWithoutSigningIn = () => {
    //console.log(this.state.userInfo);
    if (this.state.userInfo == null) {
      this.props.navigation.navigate('Dashboard');
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(Alert.alert(
          'You are signed out! Would you like to sign back in?',
          '',
          [
            {
              text: 'Yes',
              onPress: () => this.signIn(), style: 'default'
            },
            {
              text: 'No',
              onPress: () => Alert.alert(
                'Have a good day!',
                '',
                [
                  {
                    text: 'Ok',
                    style: 'default'
                  },
                ],
                {cancelable: true},
                //clicking out side of alert will not cancel
              ),
              style: 'destructive'
            },
          ],
          {cancelable: false},
          //clicking out side of alert will not cancel
        ));
      this.setState({loggedIn: false});
      this.setState({userInfo: null});
      //this.setState({userInfo: {}});
    } catch (error) {
      console.error(error);
    }
  };
  signInWithLogging = () => {
    let user = this.state.userInfo;
    this.props.navigation.navigate('Dashboard', {
      user: user,
      isUser: true,
    });
  };
  render() {
    return (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff'}}>
            {this.state.loggedIn == false && (
              <FastImage
                style={{
                  width: '105%',
                  height: '18.5%',
                  marginBottom: '10%',
                  marginTop: '50%',
                  marginLeft: '0%',
                }}
                source={require('./amountOfQuestions/Logo1.png')}
              />
            )}
            {this.state.loggedIn == true && (
              <FastImage
                style={{
                  width: '105%',
                  height: '16.5%',
                  marginBottom: '10%',
                  //marginTop: '50%',
                  marginLeft: '0%',
                }}
                source={require('./amountOfQuestions/Logo1.png')}
              />
            )}
            {this.state.loggedIn == false && (
              <View style={{alignItems: 'center'}}>
                <GoogleSigninButton
                  style={{width: '20%', height: 48}}
                  //size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={() => this.signIn()}
                />
              </View>
            )}

            <Text>{this.state.loggedIn}</Text>
            {this.state.loggedIn && (
              <Button
                large
                full
                style={styles.StyleforButton}
                onPress={() => this.signInWithLogging()}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  {'Play'}
                </Text>
              </Button>
            )}
            {this.state.loggedIn && (
              <View>
                <Button
                  large
                  full
                  style={styles.StyleforButton}
                  onPress={() => this.signOut()}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '500',
                      textAlign: 'center',
                    }}>
                    {' '}
                    Log Out{' '}
                  </Text>
                </Button>
              </View>
            )}
            {!this.state.loggedIn && (
              <Button
                large
                full
                style={styles.StyleforButton}
                onPress={() => this.playWithoutSigningIn()}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    textAlign: 'center',
                  }}>
                  {'Play without signing in'}
                </Text>
              </Button>
            )}

            <Text style={{marginBottom: 377.5}}></Text>
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
