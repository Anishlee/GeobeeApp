//startstop
//http://35.239.39.107:8080/geobee/getCapitalQuestions?size=${Amount}
import React, {PureComponent} from 'react';
import {Dimensions} from 'react-native';
/*
 {this.state.counter < 1 && (
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 4,
                            borderColor: '#73c7ab',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                          }}
                          onPress={() => this.nextQuestion(userSession)}>
                          <Text
                            style={{
                              fontSize: 25,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            <Text>{'Check Answer'}</Text>
                          </Text>
                        </Button>
                      )}
          */
import * as Progress from 'react-native-progress';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Radio,
  Button,
  TouchableOpacity,
  Right,
} from 'native-base';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  YellowBox,
  ScrollView,
  LogBox
} from 'react-native';
import FastImage from 'react-native-fast-image';
import normalize from 'react-native-normalize';
import {RFValue} from 'react-native-responsive-fontsize';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default class Quiz extends PureComponent {
  constructor() {
    super();

    this.state = {
      progress: 0,
      indeterminate: false,
      data: [],
      fetching: true,
      count: 1,
      userSession: [],
      currentSelection: '',
      notSelected: 'a',
      userChoice: '',
      counter: 1,
      backgroundColora: '#4EA688',
      backgroundColorb: '#4EA688',
      backgroundColorc: '#4EA688',
      backgroundColord: '#4EA688',
      backgroundColore: '',
      backgroundColorf: '',
      backgroundColorg: '',
      backgroundColorh: '',
      backgroundColori: '',
      backgroundColorj: '',
      backgroundColork: '',
      backgroundColorl: '',
      stateArray: [],
      previousArray: [],
      moving: 'false',
      flag: null,
      user: null,
      data1: [],
      sent: false,
      totalQuestions: [],
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const {isFocused} = this.props;
    const {userSession, count, currentSelection} = this.state;
    const {currentSelection: previousCurrentSelection} = prevState;
    let currentQuestion;

    if (prevProps.isFocused !== isFocused) {
      setTimeout(() => {
        this.setState({data: []});
        this.CapitalsQuestions();
      }, 500);
      // //console.log("userInfo username", JSON.stringify(userInfo.username));
    }

    if (Array.isArray(userSession) && userSession.length > 0) {
      currentQuestion = userSession.find(
        (question) => question.index === count - 1,
      );
    }

    if (currentSelection !== previousCurrentSelection) {
      this.renderCurrentQuestion(
        currentQuestion,
        userSession,
        currentSelection,
        count,
      );
    }
  }
  componentDidMount() {
    const sent = this.props.navigation.getParam('sent', false);
    const data1 = this.props.navigation.getParam('data1', []);
    this.Questions();

    this.animate();

    const user = this.props.navigation.getParam('user', 'value');
    const Amount = this.props.navigation.getParam('amount', 'value');
    this.setState({user: user});
    this.setState({sent: sent});
    // this.setState({data1: data1});
    //console.log("'*********data", this.state.data);
    //console.log("'*********data1", this.state.data1);
    //console.log("'*********data1", this.state.data1.questions);
    //console.log(this.state.sent);
    //console.log(Amount);
    for (let i = 0; i < Amount; i++) {
      this.state.stateArray[i] = 'false';
    }
    for (let j = 0; j < Amount; j++) {
      this.state.previousArray[j] = 'false';
    }
    //console.log(this.state.stateArray);
    //console.log(this.state.previousArray);
  }

  Questions = () => {
    let x = 0;
    const user = this.props.navigation.getParam('user', 'value');
    let email = user.email;
    const Amount = this.props.navigation.getParam('amount', 'value');
    const State = this.props.navigation.getParam('state', 'value');
    const y = this.props.navigation.getParam('y', 'value');
    //console.log(Amount);
    //console.log(y);
    //console.log(State);
    if (y == 'General') {
      x = `http://35.239.39.107:8080/geobee/getMiscQuestions?size=${Amount}`;
    }
    if (y == 'Resume') {
      //console.log('In resume game');
      
      x = `http://35.239.39.107:8080/geobee/getUserSavedSession?email=${email}`;
    }
    if (y == 'Capitals') {
      x = `http://35.239.39.107:8080/geobee/getCapitalQuestions?size=${Amount}`;
    }
    if (y == 'States') {
      x = `http://35.239.39.107:8080/geobee/getQuestionsByState?size=${Amount}`;
    }
    if (y == 'Nicknames') {
      x = `http:/35.239.39.107:8080/geobee/getNicknamesQuestions?size=${Amount}`;
    }
    if (y == 'Flags') {
      x = `http:/35.239.39.107:8080/geobee/getFlagsQuestions?size=${Amount}`;
    }
    if (y != 'Resume') {
      fetch(x, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json});
          //console.log('YOOOOOOOOO!');
          console
            .log(this.state.data)
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
    }
    if (y == 'Resume') {
      fetch(x, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("LOG ME, PLEASE! ", json.flag)
          this.setState({data: json.questionsArray});
          this.setState({data1: json});
          this.setState({count: json.count})
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
        console.log(((this.state.data1.flag == true && y == 'Resume') || y == 'Flags' ), "AM I TRUE!")
        console.log(y == 'Resume', "HERE");
        console.log(this.state.data1, "CSY");
        console.log(this.state.data, "CSY");
        //console.log(this.state.count);
    }
  };
  
  nextQuestion = (userSession) => {
    // //console.log('*********user didnt pick any choice', this.state.count);
    if (
      userSession[this.state.count - 1].selectedOption ==
        userSession[this.state.count - 1].answerOption &&
      userSession[this.state.count - 1].selectedOption != ''
    ) {
      if (userSession[this.state.count - 1].answerOption == 'itemOne') {
        this.setState({backgroundColora: '#4EA688'});
        this.setState({backgroundColorb: '#dcdcdc'});
        this.setState({backgroundColorc: '#dcdcdc'});
        this.setState({backgroundColord: '#dcdcdc'});
        this.setState({backgroundColore: 'black'});
        this.setState({backgroundColorf: '#dcdcdc'});
        this.setState({backgroundColorg: '#dcdcdc'});
        this.setState({backgroundColorh: '#dcdcdc'});
        this.setState({backgroundColori: '#3cb371'});
      } else if (userSession[this.state.count - 1].answerOption == 'itemTwo') {
        this.setState({backgroundColorb: '#4EA688'});
        this.setState({backgroundColora: '#dcdcdc'});
        this.setState({backgroundColorc: '#dcdcdc'});
        this.setState({backgroundColord: '#dcdcdc'});
        this.setState({backgroundColorf: 'black'});
        this.setState({backgroundColore: '#dcdcdc'});
        this.setState({backgroundColorg: '#dcdcdc'});
        this.setState({backgroundColorh: '#dcdcdc'});
        this.setState({backgroundColorj: '#3cb371'});
      } else if (
        userSession[this.state.count - 1].answerOption == 'itemThree'
      ) {
        this.setState({backgroundColorc: '#4EA688'});
        this.setState({backgroundColorb: '#dcdcdc'});
        this.setState({backgroundColora: '#dcdcdc'});
        this.setState({backgroundColord: '#dcdcdc'});
        this.setState({backgroundColorg: 'black'});
        this.setState({backgroundColorf: '#dcdcdc'});
        this.setState({backgroundColore: '#dcdcdc'});
        this.setState({backgroundColorh: '#dcdcdc'});
        this.setState({backgroundColork: '#3cb371'});
      } else if (userSession[this.state.count - 1].answerOption == 'itemFour') {
        this.setState({backgroundColord: '#4EA688'});
        this.setState({backgroundColorb: '#dcdcdc'});
        this.setState({backgroundColorc: '#dcdcdc'});
        this.setState({backgroundColora: '#dcdcdc'});
        this.setState({backgroundColorh: 'black'});
        this.setState({backgroundColorf: '#dcdcdc'});
        this.setState({backgroundColorg: '#dcdcdc'});
        this.setState({backgroundColore: '#dcdcdc'});
        this.setState({backgroundColorl: '#3cb371'});
      }
    } else {
      if (userSession[this.state.count - 1].selectedOption != '') {
        if (userSession[this.state.count - 1].answerOption == 'itemOne') {
          this.setState({backgroundColori: '#3cb371'});
        }
        if (userSession[this.state.count - 1].answerOption == 'itemTwo') {
          this.setState({backgroundColorj: '#3cb371'});
        }
        if (userSession[this.state.count - 1].answerOption == 'itemThree') {
          this.setState({backgroundColork: '#3cb371'});
        }
        if (userSession[this.state.count - 1].answerOption == 'itemFour') {
          this.setState({backgroundColorl: '#3cb371'});
        }
        if (userSession[this.state.count - 1].selectedOption == 'itemOne') {
          this.setState({backgroundColora: '#dc143c'});
          this.setState({backgroundColori: '#ff6347'});

          if (userSession[this.state.count - 1].answerOption == 'itemTwo') {
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
            this.setState({backgroundColorb: '#4EA688'});
            this.setState({backgroundColorf: 'black'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemThree') {
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemFour') {
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
          }
        }

        if (userSession[this.state.count - 1].selectedOption == 'itemTwo') {
          this.setState({backgroundColorb: '#dc143c'});
          this.setState({backgroundColorj: '#ff6347'});

          if (userSession[this.state.count - 1].answerOption == 'itemOne') {
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemThree') {
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemFour') {
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
          }
        }
        if (userSession[this.state.count - 1].selectedOption == 'itemThree') {
          this.setState({backgroundColorc: '#dc143c'});
          this.setState({backgroundColork: '#ff6347'});
          if (userSession[this.state.count - 1].answerOption == 'itemTwo') {
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemFour') {
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemOne') {
            this.setState({backgroundColord: '#dcdcdc'});
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
            this.setState({backgroundColorh: '#dcdcdc'});
          }
        }
        if (userSession[this.state.count - 1].selectedOption == 'itemFour') {
          this.setState({backgroundColord: '#dc143c'});
          this.setState({backgroundColorl: '#ff6347'});
          if (userSession[this.state.count - 1].answerOption == 'itemTwo') {
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemThree') {
            this.setState({backgroundColora: '#dcdcdc'});
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColore: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
          }
          if (userSession[this.state.count - 1].answerOption == 'itemOne') {
            this.setState({backgroundColorb: '#dcdcdc'});
            this.setState({backgroundColorc: '#dcdcdc'});
            this.setState({backgroundColorf: '#dcdcdc'});
            this.setState({backgroundColorg: '#dcdcdc'});
          }
        }
      }
    }
    const y = this.props.navigation.getParam('y', 'value');
    if (
      userSession[this.state.count - 1].selectedOption == '' &&
      (userSession[this.state.count - 1].userOption == '' ||
        userSession[this.state.count - 1].userOption == 'None') &&
      y == 'Resume'
    ) {
      console.log(this.state.data1, "HHYHEYHEYEHYEHYEHEYHEYEH");
      //console.log('*********user didnt pick any choice');
      this.setState({notSelected: 'error'});
      return;
    }
    if (
      userSession[this.state.count - 1].selectedOption == '' &&
      y != 'Resume'
    ) {
      //console.log('*********user didnt pick any choice');
      this.setState({notSelected: 'error'});
      return;
    }
    if (this.state.counter < 1) {
      this.setState({
        count: this.state.count,
      });
    }
    if (this.state.counter == 1 && this.state.count != userSession.length) {
      this.setState({
        count: this.state.count + 1,
        moving: 'false',
        backgroundColora: '#4EA688',
        backgroundColorb: '#4EA688',
        backgroundColorc: '#4EA688',
        backgroundColord: '#4EA688',
        backgroundColore: 'black',
        backgroundColorf: 'black',
        backgroundColorg: 'black',
        backgroundColorh: 'black',
        backgroundColori: 'white',
        backgroundColorj: 'white',
        backgroundColork: 'white',
        backgroundColorl: 'white',
      });
    }
    if (this.state.counter == 1 && this.state.count == userSession.length) {
      this.setState({
        count: this.state.count + 1,
        moving: 'false',
      });
    }
  };
  skipQuestion = (userSession) => {
    //console.log(this.state.count < userSession.length);

    if (this.state.count < userSession.length) {
      this.setState({
        skipped: true,
        notSelected: '',
        count: this.state.count + 1,
        backgroundColora: '#4EA688',
        backgroundColorb: '#4EA688',
        backgroundColorc: '#4EA688',
        backgroundColord: '#4EA688',
        backgroundColore: 'black',
        backgroundColorf: 'black',
        backgroundColorg: 'black',
        backgroundColorh: 'black',
        backgroundColori: 'white',
        backgroundColorj: 'white',
        backgroundColork: 'white',
        backgroundColorl: 'white',
      });
      this.state.stateArray[this.state.count - 1] = 'true';
    } else {
      setTimeout(() => {
        this.submitPage(userSession);
      }, 500);
      this.state.stateArray[this.state.count - 1] = 'true';
    }
  };
  previousQuestion = (userSession) => {
    //console.log(this.state.count < userSession.length);
    this.setState({
      notSelected: '',
      count: this.state.count - 1,
    });
    this.state.previousArray[this.state.count - 2] = 'true';
  };
  animate() {
    const y = this.props.navigation.getParam('y', 'value');
    if (y != 'States') {
      let progress = 0;
      this.setState({progress});
      setTimeout(() => {
        this.setState({indeterminate: false});
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({progress});
        }, 50);
      }, 150);
    }
    if (y == 'States') {
      let progress = 0;
      this.setState({progress});
      setTimeout(() => {
        this.setState({indeterminate: false});
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          this.setState({progress});
        }, 50);
      }, 150);
    }
  }
  submitPage = (userSession) => {
    const y = this.props.navigation.getParam('y', 'value');
    //console.log('*********submitpage called');
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let userChoice = '';
    let totalQuestions = [];
    let totalAnswers = 0;
    if (y == 'Resume') {
      for (let i = 0; i < this.state.data.length; i++) {
        userChoice = '';
        const y = this.props.navigation.getParam('y', 'value');
        //console.log(this.state.data.length);
        //console.log(this.state.stateArray);
        //console.log(userSession[this.state.count - 1].userOption);
        //console.log(userSession[i].userOption);
        if (
          y == 'Resume' &&
          (userSession[i].userOption == userSession[i].choice1 ||
            userSession[i].selectedOption == 'itemOne')
        ) {
          //console.log('AAAAAAAAAAAAAAAAAAAAAA');
          //console.log(userSession[i].answer, "answer");
          //console.log(userSession[i].userOption, "userOption");
          //console.log(userSession[i].selectedOption, "selectedOption");
          totalAnswers++;
          if (userSession[i].answer == userSession[i].userOption || userSession[i].selectedOption == userSession[i].answer || userSession[i].selectedOption == userSession[i].answerOption) {
            correctAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice1,
            });
          }
          else {
            wrongAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice1,
              selectedOption: userSession[i].choice1,
            });
          }
        } else if (
          y == 'Resume' &&
          (userSession[i].userOption == userSession[i].choice2 ||
            userSession[i].selectedOption == 'itemTwo')
        ) {
          //console.log('ABBBBBBBAAAAAAAAAAAAAAAAAAA');
          //console.log(userSession[i].answer, "answer");
          //console.log(userSession[i].userOption, "userOption");
          //console.log(userSession[i].selectedOption, "selectedOption");
          totalAnswers++;
          if (userSession[i].answer == userSession[i].userOption || userSession[i].selectedOption == userSession[i].answer || userSession[i].selectedOption == userSession[i].answerOption) {
            correctAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice2,
            });
          }
          else {
            wrongAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice2,
              selectedOption: userSession[i].choice2,
            });
          }
        } else if (
          y == 'Resume' &&
          (userSession[i].userOption == userSession[i].choice3 ||
            userSession[i].selectedOption == 'itemThree')
        ) {
          //console.log('ACCCCCCCCAAAAAAAAAAAA');
          //console.log(userSession[i].answer, "answer");
          //console.log(userSession[i].userOption, "userOption");
          //console.log(userSession[i].selectedOption, "selectedOption");
          totalAnswers++;
          if (userSession[i].answer == userSession[i].userOption || userSession[i].selectedOption == userSession[i].answer || userSession[i].selectedOption == userSession[i].answerOption) {
            correctAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice3,
            });
          }
          else {
            wrongAnswers++;
            totalQuestions.push({       
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice3,
              selectedOption: userSession[i].choice3,
            });
          }
        } else if (
          y == 'Resume' &&
          (userSession[i].userOption == userSession[i].choice4 ||
            userSession[i].selectedOption == 'itemFour')
        ) {
          //console.log('AADDDDDDDDDAAAAAAAAAAAAA');
          //console.log(userSession[i].answer, "answer");
          //console.log(userSession[i].userOption, "userOption");
          //console.log(userSession[i].selectedOption, "selectedOption");
          totalAnswers++;
          if (userSession[i].answer == userSession[i].userOption || userSession[i].selectedOption == userSession[i].answer || userSession[i].selectedOption == userSession[i].answerOption) {
            correctAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice4,
            });
          }
          else {
            wrongAnswers++;
            totalQuestions.push({
              correctAnswer: userSession[i].answer,
              answerOption: userSession[i].answerOption,
              choice1: userSession[i].choice1,
              choice2: userSession[i].choice2,
              choice3: userSession[i].choice3,
              choice4: userSession[i].choice4,
              question: userSession[i].question,
              questionId: i + 1,
              questionId2: userSession[i].questionId2,
              questionSubType: userSession[i].questionSubType,
              questionType: userSession[i].questionType,
              userOption: userSession[i].choice4,
              selectedOption: userSession[i].choice4,
            });

          }
        } else {
          if (
            y == 'Resume' &&
            userSession[i].selectedOption == '' &&
            (userSession[i].userOption == '' ||
              (userSession[i].userOption == 'None' &&
                !(
                  userSession[this.state.count - 1].userOption ==
                    userSession[i].choice1 ||
                  userSession[this.state.count - 1].userOption ==
                    userSession[i].choice2 ||
                  userSession[this.state.count - 1].userOption ==
                    userSession[i].choice3 ||
                  userSession[this.state.count - 1].userOption ==
                    userSession[i].choice4
                )))
          ) {
            //console.log('AAAAAAAAFFFFFFFFFFFFAAAAAAAAAA');
            totalAnswers++;
            totalQuestions.push({
                correctAnswer: userSession[i].answer,
                answerOption: userSession[i].answerOption,
                choice1: userSession[i].choice1,
                choice2: userSession[i].choice2,
                choice3: userSession[i].choice3,
                choice4: userSession[i].choice4,
                question: userSession[i].question,
                questionId: i + 1,
                questionId2: userSession[i].questionId2,
                questionSubType: userSession[i].questionSubType,
                questionType: userSession[i].questionType,
                selectedOption: 'None',
                userOption: 'None',
              }); 
          }
        }
      }
  //    //console.log('*********outsidecorrectAnswerssaveUserSession');
   
      ///saveUserSession
      
      x = `http:/35.239.39.107:8080/geobee/resetUserSavedSession?email=${this.state.user.email}`;
    
      fetch(x, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({data: json});
          //console.log('YOOOOOOOOO!');
          console
            .log(this.state.data)
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({fetching: false});
            });
        });
    
      
      if (y == 'Flags' || (this.state.data1.flag == true && y == 'Resume')) {
       
        this.props.navigation.navigate('SummaryPage', {
          user: this.state.user,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          totalQuestion: totalAnswers,
          questionsArray: totalQuestions,
          x: 'cats',
        });
      } else {
        this.props.navigation.navigate('SummaryPage', {
          user: this.state.user,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          totalQuestion: totalAnswers,
          questionsArray: totalQuestions,
          x: 'dogs',
        });
      }
      this.setState({data: []})
      this.setState({data1: []})
    }
    else {
    //console.log(this.state.data)
    for (let i = 0; i < this.state.data.length; i++) {
      //console.log(this.state.stateArray);
      if (
        this.state.stateArray[i] == 'true' &&
        userSession[i].selectedOption == ''
      ) {
        totalAnswers++;
        totalQuestions.push({
          questionId: i + 1,
          question: userSession[i].question,
          selectedOption: 'None',
          correctAnswer: userSession[i].answer,
        });
      }
      if (userSession[i].answerOption == userSession[i].selectedOption) {
        correctAnswers++;
        totalQuestions.push({
          questionId: i + 1,
          question: userSession[i].question,
          correctAnswer: userSession[i].answer,
        });
        totalAnswers++;
        //console.log('*********correctAnswers', correctAnswers);
      } else if (userSession[i].selectedOption != '') {
        if (userSession[i].selectedOption == 'itemOne') {
          userChoice = userSession[i].choice1;
        } else if (userSession[i].selectedOption == 'itemTwo') {
          userChoice = userSession[i].choice2;
        } else if (userSession[i].selectedOption == 'itemThree') {
          userChoice = userSession[i].choice3;
        } else if (userSession[i].selectedOption == 'itemFour') {
          userChoice = userSession[i].choice4;
        }

        totalQuestions.push({
          questionId: i + 1,
          question: userSession[i].question,
          selectedOption: userChoice,

          correctAnswer: userSession[i].answer,
        });
        wrongAnswers++;
        totalAnswers++;
      }
      const y = this.props.navigation.getParam('y', 'value');
      if (y == 'Flags') {
        this.props.navigation.navigate('SummaryPage', {
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          totalQuestion: totalAnswers,
          questionsArray: totalQuestions,
          x: 'cats',
        });
      } else {
        this.props.navigation.navigate('SummaryPage', {
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          totalQuestion: totalAnswers,
          questionsArray: totalQuestions,
          x: 'dogs',
        });
      }
      this.setState({counter: 1});
    }
    //console.log('*********correctAnswers', totalQuestions);
  }
  };
  selectionOfChoise = (selectedOption, currentQuestion, userSession) => {
    //console.log('*********', selectedOption);
    if (
      currentQuestion &&
      currentQuestion['selectedOption'] !== selectedOption
    ) {
      //console.log('*********');
      this.setState({notSelected: 'a'});
      const alteredSession = userSession.map((question) => {
        if (question.index === currentQuestion.index) {
          return Object.assign({}, question, {selectedOption});
        }
        return question;
      });
      this.setState({
        userSession: alteredSession,
        currentSelection: selectedOption,
      });
    }
    //console.log('*--********usersession', userSession);
  };
  SaveGame = (userSession) => {
    //console.log('*********submitpage called');

    let correctAnswers = 0;
    let wrongAnswers = 0;
    let userChoice = '';
    let totalQuestions = [];
    let totalAnswers = 0;
    for (let i = 0; i < this.state.data.length; i++) {
      userChoice = '';
      const y = this.props.navigation.getParam('y', 'value');
      //console.log(this.state.data.length);
      //console.log(this.state.stateArray);
      //console.log(userSession[this.state.count - 1].userOption);
      //console.log(userSession[i].userOption);
      if (
        y == 'Resume' &&
        (userSession[i].userOption == userSession[i].choice1 ||
          userSession[i].selectedOption == 'itemOne')
      ) {
        //console.log('AAAAAAAAAAAAAAAAAAAAAA');
        totalAnswers++;
        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userSession[i].choice1,
        });
      } else if (
        y == 'Resume' &&
        (userSession[i].userOption == userSession[i].choice2 ||
          userSession[i].selectedOption == 'itemTwo')
      ) {
        //console.log('ABBBBBBBAAAAAAAAAAAAAAAAAAA');
        totalAnswers++;
        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userSession[i].choice2,
        });
      } else if (
        y == 'Resume' &&
        (userSession[i].userOption == userSession[i].choice3 ||
          userSession[i].selectedOption == 'itemThree')
      ) {
        //console.log('ACCCCCCCCAAAAAAAAAAAA');
        totalAnswers++;
        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userSession[i].choice3,
        });
      } else if (
        y == 'Resume' &&
        (userSession[i].userOption == userSession[i].choice4 ||
          userSession[i].selectedOption == 'itemFour')
      ) {
        //console.log('AADDDDDDDDDAAAAAAAAAAAAA');
        totalAnswers++;
        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userSession[i].choice4,
        });
      } else {
        if (
          y == 'Resume' &&
          userSession[i].selectedOption == '' &&
          (userSession[i].userOption == '' ||
            (userSession[i].userOption == 'None' &&
              !(
                userSession[this.state.count - 1].userOption ==
                  userSession[i].choice1 ||
                userSession[this.state.count - 1].userOption ==
                  userSession[i].choice2 ||
                userSession[this.state.count - 1].userOption ==
                  userSession[i].choice3 ||
                userSession[this.state.count - 1].userOption ==
                  userSession[i].choice4
              )))
        ) {
          //console.log('AAAAAAAAFFFFFFFFFFFFAAAAAAAAAA');
          totalAnswers++;
          totalQuestions.push({
            answer: userSession[i].answer,
            answerOption: userSession[i].answerOption,
            choice1: userSession[i].choice1,
            choice2: userSession[i].choice2,
            choice3: userSession[i].choice3,
            choice4: userSession[i].choice4,
            question: userSession[i].question,
            questionId: i + 1,
            questionId2: userSession[i].questionId2,
            questionSubType: userSession[i].questionSubType,
            questionType: userSession[i].questionType,
            userOption: 'None',
          });
        }
      }
      if (
        userSession[i].answerOption == userSession[i].selectedOption ||
        (userSession[i].answerOption == userSession[i].userOption &&
          y != 'Resume')
      ) {
        //console.log('AAAAAAGGGGGGGGGGAAAAAAAAA');
        correctAnswers++;
        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userSession[i].answer,
        });
        totalAnswers++;
        //console.log('*********correctAnswers', correctAnswers);
        console.log(
          'TTTTTRRRRRRRRUUUUUUUUEEEEEEOOOOOOOOOORORRRRRRRRFFFFFAAAAAAALLLLLSSSSSEEEEEE',
          userSession[i].selectedOption != '' && y != 'Resume',
        );
      } else if (userSession[i].selectedOption != '' && y != 'Resume') {
        //console.log('HHHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEYYYYYYYYYYy');
        if (
          userSession[i].selectedOption == 'itemOne' ||
          userSession[i].userOption == userSession[i].choice1
        ) {
          userChoice = userSession[i].choice1;
          //console.log('CHOOOIIIIIIICCCCCCCCEEEEEEE 1', userChoice);
        } else if (
          userSession[i].selectedOption == 'itemTwo' ||
          userSession[i].userOption == userSession[i].choice2
        ) {
          userChoice = userSession[i].choice2;
          //console.log('CHOOOIIIIIIICCCCCCCCEEEEEEE 2', userChoice);
        } else if (
          userSession[i].selectedOption == 'itemThree' ||
          userSession[i].userOption == userSession[i].choice3
        ) {
          userChoice = userSession[i].choice3;
          //console.log('CHOOOIIIIIIICCCCCCCCEEEEEEE 3', userChoice);
        } else if (
          userSession[i].selectedOption == 'itemFour' ||
          userSession[i].userOption == userSession[i].choice4
        ) {
          userChoice = userSession[i].choice4;
          //console.log('CHOOOIIIIIIICCCCCCCCEEEEEEE 4', userChoice);
        }

        totalQuestions.push({
          answer: userSession[i].answer,
          answerOption: userSession[i].answerOption,
          choice1: userSession[i].choice1,
          choice2: userSession[i].choice2,
          choice3: userSession[i].choice3,
          choice4: userSession[i].choice4,
          question: userSession[i].question,
          questionId: i + 1,
          questionId2: userSession[i].questionId2,
          questionSubType: userSession[i].questionSubType,
          questionType: userSession[i].questionType,
          userOption: userChoice,
        });
        wrongAnswers++;
        totalAnswers++;
      } else {
        if (y != 'Resume' && userSession[i].selectedOption == '') {
          //console.log('HIIIIDSJFOSJDFODSJFOSJFDODSIFJOSDFIJOJFSDOFJ');

          totalQuestions.push({
            answer: userSession[i].answer,
            answerOption: userSession[i].answerOption,
            choice1: userSession[i].choice1,
            choice2: userSession[i].choice2,
            choice3: userSession[i].choice3,
            choice4: userSession[i].choice4,
            question: userSession[i].question,
            questionId: i + 1,
            questionId2: userSession[i].questionId2,
            questionSubType: userSession[i].questionSubType,
            questionType: userSession[i].questionType,
            userOption: 'None',
          });
          wrongAnswers++;
          totalAnswers++;
        }
      }
    }
    //console.log('*********outsidecorrectAnswerssaveUserSession');
    //console.log(this.state.count);
    //console.log('*********count', this.state.count);
    //console.log('*********user', this.state.user);
    //console.log('*********totalQuestions', totalQuestions);
    //console.log('*********data', this.state.data);
    const y = this.props.navigation.getParam('y', 'value');
    ///saveUserSessio
    this.setState({totalQuestions: totalQuestions});
    //console.log('*********correctAnswerssaveUserSession');
    if (this.state.data1.flag == true && y == 'Resume') {
      console.log("Flag Resume True");
      fetch('http://35.239.39.107:8080/geobee/saveUserSession', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        data: this.state.data,
        questionsArray: totalQuestions,
        count: this.state.count,
        flag: true,
      }),
    });

    }
    else if (y == 'Flags'){
      console.log("Flag True");
      fetch('http://35.239.39.107:8080/geobee/saveUserSession', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        data: this.state.data,
        questionsArray: totalQuestions,
        count: this.state.count,
        flag: true,
      }),
    });

    }
    else {
      console.log("Else")
      fetch('http://35.239.39.107:8080/geobee/saveUserSession', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        data: this.state.data,
        questionsArray: totalQuestions,
        count: this.state.count,
        flag: false,
      }),
    });

    }
    ////console.log('*********count', this.state.count);
    ////console.log('*********user', this.state.user);
    ////console.log('*********totalQuestions', totalQuestions);
    ////console.log('*********data', this.state.data);
  };
  selectionOfChoise = (selectedOption, currentQuestion, userSession) => {
    //console.log('*********', selectedOption);
    if (
      currentQuestion &&
      currentQuestion['selectedOption'] !== selectedOption
    ) {
      //console.log('*********');
      this.setState({notSelected: 'a'});
      const alteredSession = userSession.map((question) => {
        if (question.index === currentQuestion.index) {
          return Object.assign({}, question, {selectedOption});
        }
        return question;
      });
      this.setState({
        userSession: alteredSession,
        currentSelection: selectedOption,
      });
    }
    //console.log('*--********usersession', userSession);
  };
  displayFlag(question) {
    let x = null;
    if (question == 'https://flagcdn.com/256x192/us-ar.png') {
      //console.log();
    } else if (question == 'https://flagcdn.com/256x192/us-il.png') {
      //console.log();
    } else if (question == 'https://flagcdn.com/256x192/us-ks.png') {
      //console.log();
    } else if (question == 'https://flagcdn.com/256x192/us-or.png') {
      //console.log();
    } else if (question == 'https://flagcdn.com/256x192/us-ut.png') {
      //console.log();
    } else {
      return question;
    }
  }
  onPress3 = (item, userSession) => {
    const y = this.props.navigation.getParam('y', 'value');
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption == item.choice3
    ) {
      userSession[this.state.count - 1].selectedOption = item.choice3;
      return (
        <Right>
          <Radio selected={true} />
        </Right>
      );
    }
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption != item.choice3
    ) {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemThree'} />
        </Right>
      );
    }
    if (y != 'Resume') {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemThree'} />
        </Right>
      );
    }
  };
  onPress4 = (item, userSession) => {
    //console.log(userSession[this.state.count - 1].userOption);
    const y = this.props.navigation.getParam('y', 'value');
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption == item.choice4
    ) {
      userSession[this.state.count - 1].selectedOption = item.choice4;
      return (
        <Right>
          <Radio selected={true} />
        </Right>
      );
    }
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption != item.choice4
    ) {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemFour'} />
        </Right>
      );
    }
    if (y != 'Resume') {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemFour'} />
        </Right>
      );
    }
  };
  onPress2 = (item, userSession) => {
    const y = this.props.navigation.getParam('y', 'value');
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption == item.choice2
    ) {
      userSession[this.state.count - 1].selectedOption = item.choice2;
      return (
        <Right>
          <Radio selected={true} />
        </Right>
      );
    }
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption != item.choice2
    ) {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemTwo'} />
        </Right>
      );
    }
    if (y != 'Resume') {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemTwo'} />
        </Right>
      );
    }
  };
  onPress1 = (item, userSession) => {
    const y = this.props.navigation.getParam('y', 'value');
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption == item.choice1
    ) {
      userSession[this.state.count - 1].selectedOption = item.choice1;
      return (
        <Right>
          <Radio selected={true} />
        </Right>
      );
    }
    if (
      y == 'Resume' &&
      userSession[this.state.count - 1].userOption != item.choice1
    ) {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemOne'} />
        </Right>
      );
    }
    if (y != 'Resume') {
      return (
        <Right>
          <Radio selected={item.selectedOption == 'itemOne'} />
        </Right>
      );
    }
  };
  renderCurrentQuestion = (
    currentQuestion,
    userSession,
    currentSelection,
    count,
  ) => {
    const y = this.props.navigation.getParam('y', 'value');
    //console.log(JSON.stringify(currentQuestion));
    if (this.state.progress < 1) {
      return (
        <View>
          <ScrollView>
            <View style={{backgroundColor: '#ffffff'}}>
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
              <Text
                style={{
                  fontSize: RFValue(35, 750),
                  fontWeight: 'bold',

                  textAlign: 'center',
                  color: '#4EA688',
                  marginTop: '5%',
                  marginBottom: '2%',
                }}>
                {' '}
                Loading{' '}
              </Text>
              <Progress.Bar
                progress={this.state.progress}
                indeterminate={this.state.indeterminate}
                borderWidth={5}
                borderRadius={10}
                color={'#4EA688'}
                borderColor={'#4EA688'}
                style={{marginLeft: '23%'}}
                width={225}
                height={10}
              />
              <Text style={{marginBottom: 450}}></Text>
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
    if (this.state.progress == 1) {
      return (
        <View>
          <FlatList
            data={[currentQuestion]}
            renderItem={({item}) => (
              <View>
                <View style={styles.item}>
                  <View style={{backgroundColor: '#ffffff'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#4EA688',
                        fontWeight: 'bold',
                        fontSize: RFValue(35, 750),
                        marginBottom: 5,
                        marginTop: 12,
                      }}>
                      Question {this.state.count}:
                    </Text>
                    {((this.state.data1.flag == true && y == 'Resume') || y == 'Flags')  && 
                      item.question !=
                        ('https://flagcdn.com/h120/us-ar.png' ||
                          'https://flagcdn.com/h120/us-il.png' ||
                          'https://flagcdn.com/h120/us-ks.png' ||
                          'https://flagcdn.com/h120/us-or.png' ||
                          'https://flagcdn.com/h120/us-ok.png' ||
                          'https://flagcdn.com/h120/us-wi.png' ||
                          'https://flagcdn.com/h120/us-ia.png' ||
                          'https://flagcdn.com/h120/us-mt.png' ||
                          'https://flagcdn.com/h120/us-ca.png' ||
                          'https://flagcdn.com/h120/us-ut.png' ||
                          'https://flagcdn.com/h120/us-nd.png' ||
                          'https://flagcdn.com/h120/us-sd.png' ||
                          'https://flagcdn.com/h120/us-va.png' ||
                          'https://flagcdn.com/h120/us-sd.png' ||
                          'https://flagcdn.com/h120/us-mn.png' ||
                          'https://flagcdn.com/h120/us-id.png' ||
                          'https://flagcdn.com/h120/us-ky.png' ||
                          'https://flagcdn.com/h120/us-wa.png' ||
                          'https://flagcdn.com/h120/us-ne.png' ||
                          'https://flagcdn.com/h120/us-me.png' ||
                          'https://flagcdn.com/h120/us-nh.png' ||
                          'https://flagcdn.com/h120/us-fl.png' ||
                          'https://flagcdn.com/h120/us-wy.png' ||
                          'https://flagcdn.com/h120/us-nv.png' ||
                          'https://flagcdn.com/h120/us-wv.png') && (
                        <View style={{alignItems: 'center'}}>
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                            }}
                            source={{
                              uri: this.displayFlag(item.question),
                            }}
                          />
                        </View>
                      )}
                    {((this.state.data1.flag == true && y == 'Resume') || y == 'Flags' ) && (
                      <View
                        style={{
                          alignItems: 'center',
                        }}>
                        {item.question ==
                          'https://flagcdn.com/h120/us-ar.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                            }}
                            source={require('./amountOfQuestions/us-ar.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ut.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/utah.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-nv.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/nevada.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ne.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/nebraska.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-wv.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/westviriginia.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-nh.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/newhampshire.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-me.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/maine.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-fl.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/florida.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ky.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/kentucky.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-wa.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/washington.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-id.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/idaho.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-wy.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/wyoming.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-mn.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/minnesota.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-in.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/indiana.jpg')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-or.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/oregon.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-sd.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/southdakota.jpg')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-nd.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/northdakota.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-il.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/illinois.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ks.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/kansas.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ok.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/image.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-wi.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/wisconsin.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-va.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/virginia.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ia.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/iowa.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-mt.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/montana.png')}
                          />
                        )}
                        {item.question ==
                          'https://flagcdn.com/h120/us-ca.png' && (
                          <FastImage
                            style={{
                              width: 256,
                              height: 192,
                              marginBottom: 10,
                              marginTop: -200,
                            }}
                            source={require('./amountOfQuestions/california.png')}
                          />
                        )}
                        <Text
                          style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 36,
                            marginBottom: -20,
                          }}>
                          What state flag is this?
                        </Text>
                      </View>
                    )}
                    {(y != 'Flags' && !(this.state.data1.flag == true && y == 'Resume'))&& (
                      <Text style={{fontSize: 25, textAlign: 'center'}}>
                        {' '}
                        {item.question}{' '}
                      </Text>
                    )}
                  </View>
                </View>

                <Container style={{marginTop: 0, marginBottom: 0}}>
                  {this.state.notSelected == 'error' && (
                    <Text style={styles.errorText}>
                      {' '}
                      Please select a option
                    </Text>
                  )}

                  <Content>
                    {this.state.moving == 'false' && (
                      <ListItem
                        style={{
                          borderBottomColor: 'white',
                        }}
                        onPress={() =>
                          this.selectionOfChoise(
                            'itemOne',
                            currentQuestion,
                            userSession,
                          )
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderWidth: 4,
                            borderColor: '#4EA688',
                            backgroundColor: 'white',
                            padding: 10,
                            fontSize: 20,
                            marginLeft: -10,
                            marginRight: -110,
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              textAlign: 'center',
                            }}>
                            {item.choice1}
                          </Text>
                        </View>
                        {this.onPress1(item, userSession)}
                      </ListItem>
                    )}
                    {this.state.moving == 'false' && (
                      <ListItem
                        style={{
                          borderBottomColor: 'white',
                        }}
                        onPress={() =>
                          this.selectionOfChoise(
                            'itemTwo',
                            currentQuestion,
                            userSession,
                          )
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderWidth: 4,
                            borderColor: '#4EA688',
                            backgroundColor: 'white',
                            padding: 10,
                            fontSize: 20,
                            marginLeft: -10,
                            marginRight: -110,
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              textAlign: 'center',
                            }}>
                            {item.choice2}
                          </Text>
                        </View>
                        {this.onPress2(item, userSession)}
                      </ListItem>
                    )}

                    {this.state.moving == 'false' && (
                      <ListItem
                        style={{
                          borderBottomColor: 'white',
                        }}
                        onPress={() =>
                          this.selectionOfChoise(
                            'itemThree',
                            currentQuestion,
                            userSession,
                          )
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderWidth: 4,
                            borderColor: '#4EA688',
                            backgroundColor: 'white',
                            padding: 10,
                            fontSize: 20,
                            marginLeft: -10,
                            marginRight: -110,
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              textAlign: 'center',
                            }}>
                            {item.choice3}
                          </Text>
                        </View>
                        {this.onPress3(item, userSession)}
                      </ListItem>
                    )}
                    {this.state.moving == 'false' && (
                      <ListItem
                        style={{
                          borderBottomColor: 'white',
                        }}
                        onPress={() =>
                          this.selectionOfChoise(
                            'itemFour',
                            currentQuestion,
                            userSession,
                          )
                        }>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,
                            borderWidth: 4,
                            borderColor: '#4EA688',
                            backgroundColor: 'white',
                            padding: 10,
                            fontSize: 20,
                            marginLeft: -10,
                            marginRight: -110,
                          }}>
                          <Text
                            style={{
                              fontSize: 25,
                              color: 'black',
                              textAlign: 'center',
                            }}>
                            {item.choice4}
                          </Text>
                        </View>
                        {this.onPress4(item, userSession)}
                      </ListItem>
                    )}

                    <View style={styles.fixToText}>
                      {count <= userSession.length && count != 1 && (
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                            alignContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 4,
                            borderColor: '#73c7ab',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                            marginBottom: -100,
                          }}
                          onPress={() => this.previousQuestion(userSession)}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            {' '}
                            Previous{' '}
                          </Text>
                        </Button>
                      )}
                      {count <= userSession.length &&
                        userSession[this.state.count - 1].selectedOption ==
                          '' && (
                          <Button
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flex: 1,
                              alignContent: 'center',
                              marginLeft: 10,
                              marginRight: 10,
                              borderWidth: 4,
                              borderColor: '#73c7ab',
                              backgroundColor: 'transparent',
                              marginTop: 15,
                              marginBottom: -100,
                            }}
                            onPress={() => this.skipQuestion(userSession)}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: 'black',
                              }}>
                              {' '}
                              Skip{' '}
                            </Text>
                          </Button>
                        )}
                      {count <= userSession.length &&
                        userSession[this.state.count - 1].selectedOption !=
                          '' && (
                          <Button
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              flex: 1,
                              alignContent: 'center',
                              marginLeft: 10,
                              marginRight: 10,
                              borderWidth: 4,
                              borderColor: '#dcdcdc',
                              backgroundColor: 'transparent',
                              marginTop: 15,
                              marginBottom: -100,
                            }}>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: '500',
                                color: '#dcdcdc',
                              }}>
                              {' '}
                              Skip{' '}
                            </Text>
                          </Button>
                        )}
                      {count < userSession.length && this.state.counter == 1 && (
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                            alignContent: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 4,
                            borderColor: '#73c7ab',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                            marginBottom: -100,
                          }}
                          onPress={() => this.nextQuestion(userSession, false)}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            Next
                          </Text>
                        </Button>
                      )}

                      {count === userSession.length && this.state.counter == 1 && (
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                            alignItems: 'center',
                            marginLeft: 10,
                            marginRight: 10,
                            borderWidth: 4,
                            borderColor: '#73c7ab',
                            backgroundColor: 'transparent',
                            marginTop: 15,
                            marginBottom: -100,
                          }}
                          onPress={() => this.submitPage(userSession)}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            Submit
                          </Text>
                        </Button>
                      )}
                    </View>
                    {this.state.user != 'value' && (
                      <View style={{alignItems: 'center'}}>
                        <Button
                          style={{
                            marginLeft: '33.5%',
                            marginRight: 10,
                            borderWidth: 4,
                            marginTop: '10%',
                            borderColor: '#73c7ab',
                            backgroundColor: 'transparent',
                          }}
                          onPress={() => this.SaveGame(userSession)}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '500',
                              color: 'black',
                            }}>
                            Save Game
                          </Text>
                        </Button>
                      </View>
                    )}
                  </Content>
                </Container>
              </View>
            )}
          />
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
  };

  render() {
    const {fetching, data, count} = this.state;
    let {userSession, currentSelection} = this.state;
    let currentQuestion;
    if (
      // this.state.sent == false &&
      data &&
      userSession &&
      userSession.length === 0 &&
      data.length > 0
    ) {
      userSession = data.map((question, index) => {
        return Object.assign({}, question, {index, selectedOption: ''});
      });
    }
    //  if (this.state.sent == true) {
    //   userSession = this.state.data1.questions.map((question, index) => {
    //   return Object.assign({}, question, {index, selectedOption: ''});
    //  });
    //  }
    const y = this.props.navigation.getParam('y', 'value');
    if (y == 'Resume') {
      if (Array.isArray(userSession) && userSession.length > 0) {
        currentQuestion = userSession.find(
          (question) => question.index === count - 1,
        );
        //console.log(userSession[this.state.count - 1].userOption);
        //console.log('WHATTTTTTTTTTTTTTTTTTTTT');
        //currentSelection = currentQuestion.selectedOption;
      }
    } else {
      if (Array.isArray(userSession) && userSession.length > 0) {
        currentQuestion = userSession.find(
          (question) => question.index === count - 1,
        );
        //currentSelection = currentQuestion.selectedOption;
      }
    }
    return currentQuestion ? (
      this.renderCurrentQuestion(
        currentQuestion,
        userSession,
        currentSelection,
        count,
      )
    ) : (
      <View>
        <ScrollView>
          <View style={{backgroundColor: '#ffffff'}}>
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
            <Text
              style={{
                fontSize: RFValue(35, 750),
                fontWeight: 'bold',

                textAlign: 'center',
                color: '#4EA688',
                marginTop: '5%',
                marginBottom: '2%',
              }}>
              {' '}
              Loading{' '}
            </Text>
            <Progress.Bar
              progress={this.state.progress}
              indeterminate={this.state.indeterminate}
              borderWidth={5}
              borderRadius={10}
              color={'#4EA688'}
              borderColor={'#4EA688'}
              style={{marginLeft: '23%'}}
              width={225}
              height={10}
            />
            <Text style={{marginBottom: 450}}></Text>
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
    marginBottom: 50,
    marginTop: -10,
  },
  item: {
    flex: 1,
    marginHorizontal: -15,
    marginTop: -15,
    padding: 30,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  text: {
    //flex: 1,
    marginHorizontal: 50,
    // marginTop: 24,
    //padding: 30,
    // backgroundColor: "#fffafa",
    fontSize: 16,
  },
  headerStyle: {
    flex: 1,
    height: 40,
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },

  fixToText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: '10%',
  },
  titleStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
  },
  titleStyle2: {
    color: '#4EA688',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 200,
    marginBottom: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
  errorText: {
    color: 'red',
    marginTop: -20,
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 0,
  },
});
//startstop