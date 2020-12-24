import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import HomePage from '../Quizzes/HomePage';
import Dashboard from '../Dashboard';
import ChooseYourQuiz from '../ChooseYourQuiz';
import Quiz from '../Quizzes/Quiz';

import AmountOfQuestions from '../AmountOfQuestions';

import SummaryPage from '../SummaryPage';
import ReviewPage from '../ReviewPage';
import ReviewPageFlag from '../ReviewPageFlag';
/*
require('../assets/images/map.png')
headerBackground: (
  <Image
  style={StyleSheet.absoluteFill}
  source={{
    uri: '',
  }}
/>
),*/
const AppNavigator = createStackNavigator(
  {
    HomePage: HomePage,
    Dashboard: Dashboard,
    ChooseYourQuiz,
    Quiz,
    SummaryPage: SummaryPage,
    AmountOfQuestions,
    ReviewPage,
    ReviewPageFlag,
  },
  {
    initialRouteName: 'HomePage',
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },

      headerTintColor: '#333333',
      headerTitleStyle: {
        color: 'transparent',
      },

      headerBackground: (
        <Image
          style={{backgroundColor: '#73c7ab', height: 95}}
          source={require('../assets/map_patternd.png')}
        />
      ),
    },
  },
);

export default createAppContainer(AppNavigator);
