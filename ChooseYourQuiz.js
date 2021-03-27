import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {Button} from 'native-base';
import normalize from 'react-native-normalize';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
export default class ChooseYourQuiz extends Component {
  constructor() {
    super();
    this.state = {
      itemSelected: '',
      data: [],
      fetching: true,
      count: 1,
    };
  }
  render() {
    const user = this.props.navigation.getParam('user', {});
    return (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff'}}>
            <Text style={styles.titleStyle}> Choose Your Quiz </Text>
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
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() =>
                this.props.navigation.navigate('AmountOfQuestions', {
                  x: 'Capitals',
                  user: user,
                })
              }>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                Capitals Quiz
              </Text>
            </Button>
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() =>
                this.props.navigation.navigate('AmountOfQuestions', {
                  x: 'Nicknames',
                  user: user,
                })
              }>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                Nicknames Quiz
              </Text>
            </Button>
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() =>
                this.props.navigation.navigate('AmountOfQuestions', {
                  x: 'Flags',
                  user: user,
                })
              }>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                Flags Quiz
              </Text>
            </Button>
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() =>
                this.props.navigation.navigate('AmountOfQuestions', {
                  x: 'General',
                  user: user,
                })
              }>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                General/Miscellaneous Quiz
              </Text>
            </Button>
            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() =>
                this.props.navigation.navigate('AmountOfQuestions', {
                  x: 'States',
                  user: user,
                })
              }>
              <Text
                style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
                U.S Geobee Questions
              </Text>
            </Button>
            <Text style={{marginBottom: 250}}></Text>
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
    fontSize: RFValue(40, 750),
    marginTop: '10%',
    marginBottom: '3%',
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
});
