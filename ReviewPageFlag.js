import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {Button} from 'native-base';

export default class ReviewPageFlag extends Component {
  render() {
    const questionsArray = this.props.navigation.getParam('questionsArray', []);
    return (
      <View>
        <ScrollView>
          <View style={{alignItems: 'center', backgroundColor: '#ffffff'}}>
            <Text style={styles.titleStyle}> Questions Summary </Text>
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
                marginBottom: 15,
              }}
            />
            <FlatList
              data={questionsArray}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.BlackBold}>
                      Question {item.questionId}
                    </Text>
                    {item.selectedOption == item.correctAnswer && (
                      <View style={{alignItems: 'center'}}>
                        <Image
                          style={{width: 256, height: 192, marginBottom: 10}}
                          source={{
                            uri: item.question,
                          }}
                        />
                        <Text style={styles.BlackLight}>
                          What state flag is this?
                        </Text>
                        <Text style={styles.Green}> {item.correctAnswer}</Text>
                      </View>
                    )}
                    {item.selectedOption != item.correctAnswer &&
                      item.selectedOption != 'None' && (
                        <View style={{alignItems: 'center'}}>
                          <Image
                            style={{width: 256, height: 192, marginBottom: 10}}
                            source={{
                              uri: item.question,
                            }}
                          />
                          <Text style={styles.BlackLight}>
                            What state flag is this?
                          </Text>
                          <Text style={styles.Red}>{item.selectedOption}</Text>
                          <Text style={styles.Green}>
                            {' '}
                            {item.correctAnswer}
                          </Text>
                        </View>
                      )}
                    {item.selectedOption == 'None' && (
                      <View style={{alignItems: 'center'}}>
                        <Image
                          style={{width: 256, height: 192, marginBottom: 10}}
                          source={{
                            uri: item.question,
                          }}
                        />
                        <Text style={styles.BlackLight}>
                          What state flag is this?
                        </Text>
                        <Text style={styles.Orange}>{item.selectedOption}</Text>
                        <Text style={styles.Green}> {item.correctAnswer}</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />
            <Button large full style={styles.StyleforButton}>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}
                onPress={() => this.props.navigation.navigate('SummaryPage')}>
                Home
              </Text>
            </Button>
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#73c7ab',
            marginTop: '17%',
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
  BlackBold: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 23,
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
    marginLeft: 60,
    marginRight: 50,
    marginBottom: '20%',
    marginTop: 50,
  },
  BlackLight: {
    color: 'black',
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 15,
  },
  Red: {
    // Define your HEX color code here.
    marginTop: 10,
    marginBottom: 10,
    color: 'red',
    fontSize: 23,
    textAlign: 'center',
  },

  Green: {
    // Define your HEX color code here.
    color: '#4EA688',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
  },
  Orange: {
    // Define your HEX color code here.
    marginTop: 10,
    marginBottom: 10,
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 23,
    textAlign: 'center',
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
    marginBottom: -50,
  },
});
