import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private alertCtrl: AlertController) {
  }
  cutHair(){
    let alert = this.alertCtrl.create({
      title: '剪髮確認',
      message: '您是16號',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: '確認',
          handler: () => {
            console.log('OK');
          }
        }
      ]
    });
    alert.present();
  }
}
