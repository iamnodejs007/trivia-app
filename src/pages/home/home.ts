import { Component } from '@angular/core';
import { NavController,
         AlertController } from 'ionic-angular';
import { OtherPage } from '../other/other';
import { QuizPage } from '../quiz/quiz';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryResult: string = 'Computers';
  difficultyResult: string = 'medium';
  numberResult: number = 5;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              ) {}

  otherPage() {
    console.log('other page clicked');
    this.navCtrl.push(OtherPage);
  }

  startQuiz() {
    let preferences = { "category": this.categoryResult,
                  "difficulty": this.difficultyResult,
                  "questionNumber": this.numberResult,
                };

    this.navCtrl.push(QuizPage, preferences);
  }
}
