import { Component } from '@angular/core';
import { NavController,
         AlertController } from 'ionic-angular';
import { OtherPage } from '../other/other';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryResult: any = 'Computers';
  difficultyResult: any = 'Medium';

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              ) {}

  goButton() {
    console.log('button clicked');
  }

  otherPage() {
    console.log('other page clicked');
    this.navCtrl.push(OtherPage);
  }

  chooseCategory() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Pick a Trivia Category');
    alert.addInput({
      type: 'radio',
      label: 'Computers',
      value: 'Computers'
    });
    alert.addInput({
      type: 'radio',
      label: 'Gadgets',
      value: 'Gadgets'
    });
    alert.addInput({
      type: 'radio',
      label: 'Mathematics',
      value: 'Mathematics'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.categoryResult = data;
      }
    });
    alert.present();
  }
}
