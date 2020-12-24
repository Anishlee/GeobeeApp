import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from 'native-base';
export default class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      fetching: true,
    };
  }
  componentDidMount() {
    const url = `http://35.188.135.212:8080/geobee/getRandomFactOfTheDay`;
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
  render() {
    console.log(this.state.data);
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
                marginBottom: 15,
              }}
            />
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginBottom: 15,
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

            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() => this.props.navigation.navigate('ChooseYourQuiz')}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center',
                }}>
                New Game
              </Text>
            </Button>

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
    marginTop: '5%',
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
    marginBottom: 40,
    marginTop: 10,
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
    marginBottom: '10%',
  },
});
