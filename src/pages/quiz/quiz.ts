import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ResultsPage } from '../results/results';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  data: any;
  questionObject: any;
  baseUrl: string = "https://opentdb.com/";
  queryUrl: string;
  questionNumber: number;
  currentQuestion: any;
  currentAnswerChoices: any = [];
  currentIncorrectAnswers: any = [];
  currentCorrectAnswer: any;
  multipleChoiceAnswer: any;
  counter: number = 0;
  incorrectCounter: number = 0;
  correctCounter: number = 0;
  checkEndRedirect: boolean = true;

  loader = this.loadingCtrl.create({
    content: 'Please wait...',
  });

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: Http,
              public loadingCtrl: LoadingController,
              ) {
                  this.loader.present();
                  this.data = this.navParams.data;
                  this.queryUrl = "api.php?amount="+this.data.questionNumber+"&category="+this.categoryChecker(this.data.category)+"&difficulty="+this.data.difficulty+"&type=multiple";

                  // load question data into questionObject
                  this.http.get(this.baseUrl+this.queryUrl)
                    .map(res => res.json())
                    .subscribe(data => {
                      this.questionObject = data.results;
                      this.loader.dismiss();
                      this.startQuiz(); // call startQuiz only after data is loaded into questionObject
                    });
              }

  startQuiz() {
    this.questionNumber = this.counter + 1;
    this.currentQuestion = this.questionObject[this.counter].question;
    this.currentIncorrectAnswers = this.questionObject[this.counter].incorrect_answers;
    this.currentCorrectAnswer = this.questionObject[this.counter].correct_answer;
    for (let i = 0; i < this.currentIncorrectAnswers.length; i++) {
      this.currentAnswerChoices.push(this.currentIncorrectAnswers[i]);
    }
    this.currentAnswerChoices.push(this.currentCorrectAnswer);
    this.currentAnswerChoices = this.shuffle(this.currentAnswerChoices);
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkEnd() {
    console.log('in checkEnd');
    if (this.counter === this.questionObject.length-1) {
      // quiz over, aggregate and present results
      let results = { correctNumber: this.correctCounter,
                      incorrectNumber: this.incorrectCounter };
      this.navCtrl.setRoot(ResultsPage, results);
      this.checkEndRedirect = false;
    }
  }

  nextButton() {
    if (this.multipleChoiceAnswer === this.currentCorrectAnswer) {
      console.log('correct answer selected');
      this.correctCounter++;
      this.checkEnd();
      if (this.checkEndRedirect) {
        this.counter++;
        this.clearAnswers();
        this.startQuiz();
      }
    } else {
      console.log('incorrect answer selected.');
      this.incorrectCounter++;
      this.checkEnd();
      if (this.checkEndRedirect) {
        this.counter++;
        this.clearAnswers();
        this.startQuiz();
      }
    }
  }

  clearAnswers() {
    this.currentAnswerChoices = [];
    this.currentCorrectAnswer = [];
    this.currentIncorrectAnswers =[];
    this.currentQuestion = [];
  }

  categoryChecker(category) {
    if (category === 'Computers') {
      return '18';
    } else if (category === 'Gadgets') {
      return '30';
    } else {
      return '19'; // for mathematics
    }
  }
}
