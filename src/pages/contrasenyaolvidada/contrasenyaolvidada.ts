import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-contrasenyaolvidada',
  templateUrl: 'contrasenyaolvidada.html',
})
export class ContrasenyaolvidadaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,
    public alertController: AlertController, public platform: Platform, private _translate: TranslateService) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  enviarEmail(email) {
    this._translate.get(['ALERTCONTROLLER.EMAILSENDTITLE', 'ALERTCONTROLLER.EMAILSENDMESSAGE', 'ALERTCONTROLLER.ERRORTITLE', 'ALERTCONTROLLER.ERRORMESSAGE', 'ALERTCONTROLLER.OKBUTTON']).subscribe(translate => {
      this.firebaseProvider.forgotPassword(email)
        .then( x => { 
          const alert = this.alertController.create({
            title: translate['ALERTCONTROLLER.EMAILSENDTITLE'],
            message: translate['ALERTCONTROLLER.EMAILSENDMESSAGE'],
            buttons: [translate['ALERTCONTROLLER.OKBUTTON']]
          });
          alert.present();
          this.navCtrl.pop()
        })
        .catch( err => 
          {
            const alert = this.alertController.create({
              title: translate['ALERTCONTROLLER.ERRORTITLE'],
              message: translate['ALERTCONTROLLER.ERRORMESSAGE'],
              buttons: [translate['ALERTCONTROLLER.OKBUTTON']]
            });
            alert.present();
          });
    });
  }

}
