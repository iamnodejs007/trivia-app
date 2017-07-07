import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  results: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
                this.results = this.navParams.data;
                console.log(this.results);
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsPage');
  }

  playAgain() {
    this.navCtrl.setRoot(HomePage);
  }
}
