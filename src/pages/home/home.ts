import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http, URLSearchParams } from '@angular/Http';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  num:any;
  add:any;
  interval:any;
  duration:any;
  callNum:any;

  constructor(public navCtrl: NavController,private alertCtrl: AlertController, public http:Http) {
    var dur = 1;
    this.interval = setInterval(()=>{
        dur = dur +1;
        this.duration = dur;
        this.readNum();
    }, 2000);
   
  }

//讀取當前號碼------------------------------------------------------------
  readNum(){
      let params: URLSearchParams = new URLSearchParams();
      params.set('robNo', "R001");
      this.http.get('http://140.131.114.143/project/data/readNum.php', {search: params})			
        .subscribe(
          (data) => {
            this.num=data.json()['numplate'];
            console.log(this.num);
            this.callNum = String(Number(this.num)+1);
            console.log(this.callNum);
          }, error => {
              this.showAlert();
          }
        );
  }

//新增號碼------------------------------------------------------------
  addNum(){
    let params = new FormData();
    params.append('numplate', this.callNum);
    params.append('numTime', '');
    params.append('robNo', 'R001');
    params.append('callState', '0');
    params.append('handleState', '1');
    this.http.post('http://140.131.114.143/project/data/addNumPlate.php',params)
    .subscribe(data => {
        this.add=data.json();
        console.log(this.add);
      }, error => {
        this.showAlert();
      }
    );
  }

//抽取號碼------------------------------------------------------------
  cutHair(){
    let alert = this.alertCtrl.create({
      title: '剪髮確認',
      message: '您是'+ this.callNum + '號',
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
            this.addNum();
            console.log('OK');
          }
        }
      ]
    });
    alert.present();
  }

//連線失敗訊息------------------------------------------------------------
  showAlert() {
      let alert = this.alertCtrl.create({
        title: '連線失敗!',
        subTitle: '請確定網路狀態, 或是主機是否提供服務中.',
        buttons: ['OK']
      });
      alert.present();
  }

}
