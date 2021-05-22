import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ListItem,
  List,
  Icon,
  ScrollView,
  Image,
} from 'react-native';
import {Button} from 'native-base';
/*     */
import {RFValue} from 'react-native-responsive-fontsize';
export default class SummaryPage extends Component {
  constructor() {
    super();
    this.state = {};
  }
  static navigationOptions = {
    headerLeft: null,
  };

  submitPage = () => {
    const x = this.props.navigation.getParam('x', 'value');

    const correctAnswers = this.props.navigation.getParam(
      'correctAnswers',
      '0',
    );
    const totalQuestions = this.props.navigation.getParam('totalQuestion', []);
    const wrongAnswers = this.props.navigation.getParam('wrongAnswers', []);
    const questionsArray = this.props.navigation.getParam('questionsArray', []);
    if (x != 'cats') {
      this.props.navigation.navigate('ReviewPage', {
        questionsArray: questionsArray,
      });
    } else {
      this.props.navigation.navigate('ReviewPageFlag', {
        questionsArray: questionsArray,
      });
    }
  };
  render() {
    //console.log('hiiiiiiiiiiu');

    const Amount = this.props.navigation.getParam('amount', 'value');
    const State = this.props.navigation.getParam('state', 'value');
    const correctAnswers = this.props.navigation.getParam(
      'correctAnswers',
      '0',
    );
    const totalQuestions = this.props.navigation.getParam('totalQuestion', []);
    return (
      <View>
        <ScrollView>
          <View style={{alignItems: 'center', backgroundColor: '#ffffff'}}>
            <Text style={styles.titleStyle2}> Quiz Summary </Text>
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
                marginBottom: '3%',
              }}
            />
            <Text style={styles.titleStyle}> Total Score: </Text>
            <Text style={styles.Green}>
              {' '}
              You got {correctAnswers} out of {totalQuestions}{' '}
            </Text>
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() => this.submitPage()}>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                Review
              </Text>
            </Button>
            <Button large full style={styles.StyleforButton2}>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}
                onPress={() => this.props.navigation.navigate('Dashboard', {isResumeTrue: false})}>
                Return to Dashboard
              </Text>
            </Button>
            <Text style={{marginBottom: 303}}></Text>
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
  titleStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  titleStyle2: {
    color: '#4EA688',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: '10%',
    marginBottom: '5%',
  },
  Blue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  Red: {
    // Define your HEX color code here.
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  },

  Green: {
    // Define your HEX color code here.
    textAlign: 'center',
    color: '#4EA688',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 40,
  },
  Orange: {
    // Define your HEX color code here.
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 20,
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
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '6%',
    marginTop: 10,
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
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '8%',
    marginTop: 10,
  },
  headerStyle: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexGrow: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: '#ffffff',
    padding: 50,
  },
});
