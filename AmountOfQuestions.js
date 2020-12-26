import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'native-base';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

export default class AmountOfQuestions extends Component {
  static navigationOptions = {
    title: 'Amount Of Questions',
  };
  constructor() {
    super();

    this.state = {
      amountOfQuestions: '',
      invalidQuestions: null,
      typedState: [],
      InvalidState: null,
      data: [],
      invalidChoice: null,
    };
  }
  /*
   const Amount = this.props.navigation.getParam('amount', 'value');
    console.log(Amount);
    const url = `http://localhost:8080/geobee/getCapitalQuestions?size=${Amount}`;
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
      */
  //http://localhost:8080/geobee/getQuestionsByState?stateName=Minnesota&size=10
  onPress(Amount) {
    if (Amount != '') {
      const x = this.props.navigation.getParam('x', 'value');

      if (x == 'States') {
        this.props.navigation.navigate('Quiz', {
          amount: Amount,
          y: 'States',
        });
      }
      if (x == 'General') {
        ///getMiscQuestions
        this.props.navigation.navigate('Quiz', {
          amount: Amount,
          y: 'General',
        });
      }
      if (x == 'Nicknames') {
        this.props.navigation.navigate('Quiz', {
          amount: Amount,
          y: 'Nicknames',
        });
      }
      if (x == 'Flags') {
        this.props.navigation.navigate('Quiz', {
          amount: Amount,
          y: 'Flags',
        });
      }
      if (x == 'Capitals') {
        this.props.navigation.navigate('Quiz', {
          amount: Amount,
          y: 'Capitals',
        });
      }
    } else {
      this.setState({invalidQuestions: ''});
    }
  }
  render() {
    return (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff'}}>
            <Text style={styles.titleStyle}> Amount of Questions </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomColor: 'grey',
                borderBottomWidth: 4,
                borderRadius: 35,
                alignSelf: 'stretch',
                width: '75%',
                marginLeft: '12.5%',
                marginBottom: '5%',
              }}
            />
            <DropDownPicker
              items={[
                {
                  label: '10',
                  value: '10',
                },
                {
                  label: '20',
                  value: '20',
                },
                {
                  label: '30',
                  value: '30',
                },
                {
                  label: '40',
                  value: '40',
                },
                {
                  label: '50',
                  value: '50',
                },
              ]}
              dropDownMaxHeight="200%"
              placeholder="Select the number of questions below"
              placeholderStyle={{
                fontWeight: '500',
                fontSize: RFValue(17.5, 750),
              }}
              containerStyle={{
                height: 60,
                marginBottom: 30,
              }}
              style={({backgroundColor: '#fafafa'}, {marginTop: 10})}
              itemStyle={{
                justifyContent: 'center',
              }}
              labelStyle={{
                textAlign: 'center',
              }}
              dropDownStyle={({backgroundColor: '#fafafa'}, {marginTop: 10})}
              onChangeItem={(item) =>
                this.setState({
                  amountOfQuestions: item.value,
                  invalidQuestions: item.value,
                })
              }
            />
            {this.state.invalidQuestions == '' && (
              <Text style={styles.errorText2}>
                Please choose one of the options above
              </Text>
            )}
            {this.state.invalidChoice == '' && (
              <Text style={styles.errorText2}>
                As of now the amount of questions you have chosen are not
                available for playing. Please choose another option.
              </Text>
            )}

            <Button
              large
              full
              style={styles.StyleforButton}
              onPress={() => this.onPress(this.state.amountOfQuestions)}>
              <Text
                style={{
                  fontSize: RFValue(20, 800),
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            </Button>
            <Text style={{marginBottom: 399}}></Text>
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
    backgroundColor: 'transparent',
    padding: 10,
    fontSize: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 100,
    marginTop: 10,
  },
  titleStyle: {
    color: '#4EA688',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: RFValue(40, 800),
    marginTop: '11%',
    marginBottom: '5%',
  },
  errorText2: {
    color: 'red',
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
