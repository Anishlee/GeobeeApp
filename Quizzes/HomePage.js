
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
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
import auth, { firebase } from '@react-native-firebase/auth';

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Home Page',
  };
  constructor() {
    super();

    this.authCredentialListener = null;
    this.user = null;
    this.state = {
      loggedIn: false,
      setloggedIn: false,
      userInfo: null,
      setUserInfo: [],
      data: null,
      credentialStateForUser: -1
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
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });

    this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
      console.warn('Credential Revoked');

      this.fetchAndUpdateCredentialState().catch(error => 
        this.setState({credentialStateForUser: `Error: ${error.code}`}),
        );
    });
  }

  componentDidUpdate() {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '647666075800-46h7rjimhm9du40cvhug8jus5u6fjguv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      
    });
    return appleAuth.onCredentialRevoked(async () => {
      console.warn('If this function executes, User Credentials have been Revoked');
    });
  }

  componentWillUnmount() {
    this.authCredentialListener();
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
  onAppleButtonPress = async () => {
    try {
   // 1). start a apple sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

//const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

  // 2). if the request was successful, extract the token and nonce
  const { user: newUser, email, realUserStatus, identityToken, nonce } = appleAuthRequestResponse;
console.log("Hi.")
let first_name = ""
let last_name = ""
let x = ""
if (appleAuthRequestResponse.email != null) {
  if (appleAuthRequestResponse.fullName.givenName != null && appleAuthRequestResponse.fullName.familyName != null) {
    first_name = appleAuthRequestResponse.fullName.givenName.toLowerCase();
    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
    last_name = appleAuthRequestResponse.fullName.familyName.toLowerCase();
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1)
    console.log(first_name, last_name, appleAuthRequestResponse.email, appleAuthRequestResponse.user);
    console.log("PLEASE WORK!")
    const url = `http://35.208.160.247:8080/geobee/saveUIDSessionInfo?userId=${appleAuthRequestResponse.user}&email=${appleAuthRequestResponse.email}&fname=${first_name}&lastName=${last_name}`
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("BROROROSDOFSKFSF")
        this.setState({data: json})
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({fetching: false});
          });
      });
    
  }
  else if(appleAuthRequestResponse.fullName.givenName != null) {
    first_name = appleAuthRequestResponse.fullName.givenName.toLowerCase();
    first_name = first_name.charAt(0).toUpperCase() + first_name.slice(1)
    console.log(first_name, appleAuthRequestResponse.email, appleAuthRequestResponse.user);
    const url = `http://35.208.160.247:8080/geobee/saveUIDSessionInfo?userId=${appleAuthRequestResponse.user}&email=${appleAuthRequestResponse.email}&fname=${first_name}&lastName=${last_name}`
    fetch(url, {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json})
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
      }
  else if (appleAuthRequestResponse.fullName.familyName != null){
    last_name = appleAuthRequestResponse.fullName.familyName.toLowerCase();
    last_name = last_name.charAt(0).toUpperCase() + last_name.slice(1)
    console.log(last_name, appleAuthRequestResponse.email, appleAuthRequestResponse.user);
    const url = `http://35.208.160.247:8080/geobee/saveUIDSessionInfo?userId=${appleAuthRequestResponse.user}&email=${appleAuthRequestResponse.email}&fname=${first_name}&lastName=${last_name}`
    fetch(url, {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json})
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
      }
  else {
     first_name = "Private"
     last_name = "Person"
    console.log(first_name, last_name, appleAuthRequestResponse.email, appleAuthRequestResponse.user);
    const url = `http://35.208.160.247:8080/geobee/saveUIDSessionInfo?userId=${appleAuthRequestResponse.user}&email=${appleAuthRequestResponse.email}&fname=${first_name}&lastName=${last_name}`
    fetch(url, {
      method: 'GET',
    })
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json})
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
      }
}
else {
  
  const url = `http://35.208.160.247:8080/geobee/getUIDSessionInfo?userId=${appleAuthRequestResponse.user}`;
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json})

          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({fetching: false});
          });
      });
     
}
console.log(this.state.data)
console.log("appleAuthRequestResponse",appleAuthRequestResponse);
console.log("EMAIL",JSON.stringify(appleAuth.Scope.EMAIL));
console.log("FULL_NAME", JSON.stringify(appleAuth.Scope.FULL_NAME));
console.log("Scope", JSON.stringify(appleAuth.identityToken));

  this.user = newUser;
  this.setState({userInfo: newUser});
  console.log("ULTIMATE ULTIMATE YES")
  console.log(this.state.data)
  this.setState({loggedIn: true});
  console.log(this.state.loggedIn)
  if (this.state.data != null){
    console.log("DATA IS NOT EQUAL TO NULL")
  this.props.navigation.navigate('Dashboard', {user: this.state.data, apple: true, isUser: true,});
  }
  console.log("ultimate yes")
  this.fetchAndUpdateCredentialState()
  .then(response => this.setState({credentialStateForUser: response}))
  .catch(error => this.setState({credentialStateForUser: `Error: ${error.code}`}),);

  // can be null in some scenarios
  if (identityToken) {
    // 3). create a Firebase `AppleAuthProvider` credential
    console.log(identityToken, nonce);
    const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);

    // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
    //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
    //     to link the account to an existing user
    const userCredential = await firebase.auth().signInWithCredential(appleCredential);

    // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
    console.log(`Firebase authenticated via Apple, UID: ${userCredential.user.uid}`);
    console.log(`Firebase authenticated via Apple, UID: `);
    console.log(userCredential)
  } else {
    // handle this - retry?
  }
} catch (error) {
if (error.code === appleAuth.Error.CANCELED) {
console.warn('User canceled Apple Sign In');
} else {
  console.error(error);
}
}
  };
  
fetchAndUpdateCredentialState = async() => {
if (this.user === null) {
 this.setState({credentialStateForUser: 'N/A'});
} else {
const credentialState = await appleAuth.getCredentialStateForUser(this.user);
if (credentialState === appleAuth.State.AUTHORIZED) {
this.setState({credentialStateForUser: 'AUTHORIZED'});
} else {
this.setState({credentialStateForUser: credentialState});
}
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
                height: '17.5%',
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
                marginTop: '50%',
                marginLeft: '0%',
              }}
              source={require('./amountOfQuestions/Logo1.png')}
            />
            )}
            {this.state.loggedIn == false && (
              <View style={{alignItems: 'center'}}>
                <GoogleSigninButton
                  style={{width: 192, height: 48}}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={() => this.signIn()}
                />
                 {appleAuth.isSupported && (
        <AppleButton
          cornerRadius={5}
          style={{ width: 192, height: 48 }}
          buttonStyle={AppleButton.Style.BLACK}
          buttonType={AppleButton.Type.SIGN_IN}
          onPress={() => this.onAppleButtonPress()}
        />
      )}
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
