import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'page-contrasenyaolvidada',
  templateUrl: 'contrasenyaolvidada.html',
})
export class ContrasenyaolvidadaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider,
    public alertController: AlertController, public platform: Platform) {
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  enviarEmail(email) {
    this.firebaseProvider.forgotPassword(email)
      .then( x => { 
        const alert = this.alertController.create({
          title: 'Correo enviado',
          message: 'Se le ha enviado un correo electrónico para restablecer su contraseña.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.pop()
      })
      .catch( err => 
        {
          const alert = this.alertController.create({
            title: 'Error',
            message: 'Ha ocurrido un error.',
            buttons: ['OK']
          });
          alert.present();
        });
  }

}
