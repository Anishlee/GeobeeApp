import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import {Button} from 'native-base';
export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      data1: [],
      fetching: true,
      user: null,
      isUser: false,
      isResumeTrue: true,
    };
  }

  componentDidMount() {
    const isResumeTrue = this.props.navigation.getParam('isResumeTrue', true);
    this.setState({isResumeTrue: isResumeTrue});
    const user = this.props.navigation.getParam('user', 'value');
    const isUser = this.props.navigation.getParam('isUser', 'value');
    this.setState({user: user});
    this.setState({isUser: isUser});
    
    //console.log(user);
    //console.log("IS USER THERE", isUser);
    const url = `http://35.239.39.107:8080/geobee/getRandomFactOfTheDay`;
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
  onPress = () => {
    const user = this.props.navigation.getParam('user', 'value');
    let email = user.email;
    //console.log(email)
    //http://35.239.39.107:8080/geobee/getUserSavedSession?email=soumyathebest1@gmail.com
    //Alert.alert("data1 YOLO", email)
    const url = `http://35.239.39.107:8080/geobee/getUserSavedSession?email=${email}`;
   
      fetch(url, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          //console.log("LOG ME, PLEASE! ",json);
         /// Alert.alert("data1 YOLO json", json);
          
         
          this.setState({data1: json})
          console.log("LOG ME, PLEASE! ", json)
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
      //Alert.alert("data1 YOLO", this.state.data1)
      //console.log("data1 YOLO", this.state.data1.length == 0)
      //console.log("data1 YOLO1", this.state.data1.length)
      //console.log("data1 YOLO2", this.state.data1)
    if (this.state.data1.length != 0) {
    console.log(this.state.data1.flag)
    this.props.navigation.navigate('Quiz', {
      data1: this.state.data1.questions,
      y: 'Resume',
      user: user,
    });
  }
  else {
    //console.log("NOPE")
  }
  };
  render() {
    
    //console.log(this.state.data);
    const user = this.props.navigation.getParam('user', 'value');
    //console.log('life');
    
      

    // //console.log(this.state.user);
    return (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff', flex: 1}}>
            <Text style={styles.titleStyle}> U.S. Geography Quiz </Text>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: 'grey',
                borderBottomWidth: 4,
                borderRadius: 35,
                alignSelf: 'stretch',
                width: '50%',
                marginLeft: '25%',
                marginBottom: '5%',
              }}
            />
            {this.state.user != 'value' && (
              <Text style={styles.Green}> Welcome {user.name}</Text>
            )}
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginBottom: '5%',
                      textAlign: 'center',
                    }}>
                    {' '}
                    Fact of the Day
                  </Text>
                  <Text style={{fontSize: 20, textAlign: 'center'}}>
                    {' '}
                    {item}
                  </Text>
                </View>
              )}
            />
            {this.state.user == 'value' && (
              <Button
              large
              full
              style={styles.StyleforButton2}
              onPress={() =>
                this.props.navigation.navigate('ChooseYourQuiz', {user: user, isUserTrue: false})
              }>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'black',
                  textAlign: 'center',
                }}>
                New Game
              </Text>
            </Button>
            )}
            {this.state.user != 'value' && (
               <Button
               large
               full
               style={styles.StyleforButton2}
               onPress={() =>
                 this.props.navigation.navigate('ChooseYourQuiz', {user: user, isUserTrue: true})
               }>
               <Text
                 style={{
                   fontSize: 20,
                   fontWeight: '500',
                   color: 'black',
                   textAlign: 'center',
                 }}>
                 New Game
               </Text>
             </Button>
            )}
            {this.state.isUser == true && this.state.isResumeTrue == true && (
              <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() => this.onPress()}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Resume Game
              </Text>
            </Button>
            )}
            <Text style={{marginBottom: 350}}></Text>
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
            source={require('./assets/map_patternd.png')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StyleforButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4EA688',
    backgroundColor: '#4EA688',
    padding: 10,
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
    marginTop: 0,
  },
  StyleforButton2: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#4EA688',
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '5%',
    marginTop: '2%',
  },
  item: {
    marginHorizontal: 10,
    padding: '10%',
    backgroundColor: '#ffffff',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    borderWidth: 3,
    borderColor: '#4EA688',
  },
  titleStyle: {
    color: '#4EA688',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: '10%',
    marginBottom: '5%',
  },
  Green: {
    // Define your HEX color code here.
    textAlign: 'center',
    color: '#4EA688',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: '5%',
  },
});
