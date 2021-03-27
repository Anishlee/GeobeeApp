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
const screens = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home Page',
    },
  },
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: 'Dashboard',
      headerBackTitle: 'Home Page',
    },
  },
  ChooseYourQuiz: {
    screen: ChooseYourQuiz,
    navigationOptions: {
      title: 'Choose Your Quiz',
      headerBackTitle: 'Dashboard',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerBackTitleStyle: {
        maxWidth: 250,
      },
      headerBackTitle: 'Number Of Questions',
    },
  },
  SummaryPage: {
    screen: SummaryPage,
  },
  AmountOfQuestions: {
    screen: AmountOfQuestions,
    navigationOptions: {
      title: 'Amount Of Questions',
      headerBackTitleStyle: {
        maxWidth: 250,
      },
      headerBackTitle: 'Quizzes',
    },
  },
  ReviewPage: {
    screen: ReviewPage,
    navigationOptions: {
      headerBackTitle: 'Summary',
    },
  },
  ReviewPageFlag: {
    screen: ReviewPageFlag,
    navigationOptions: {
      headerBackTitle: 'Summary',
    },
  },
};
const AppNavigator = createStackNavigator(screens, {
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
});

export default createAppContainer(AppNavigator);
