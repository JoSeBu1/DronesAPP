import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform, ModalController } from 'ionic-angular';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { TranslateService } from '@ngx-translate/core';
import { LicensemodalPage } from '../licensemodal/licensemodal';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'page-acercade',
  templateUrl: 'acercade.html',
})
export class AcercadePage {

  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commondata: CommondataProvider,
    public toastCtrl: ToastController, private platform: Platform, private _translate: TranslateService,
    private modalCtrl: ModalController, private socialSharing: SocialSharing) {
  }

  //Ejecuta alguna acciones al abrirse la pantalla
  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {
      if (this.counter == 0) {
        this.counter++;
        this.presentToast();
        setTimeout(() => { this.counter = 0 }, 2000)
      } else {
        this.platform.exitApp();
      }
    }, 0)
  }

  //Muestra lla licencia en un modal
  async presentLicense() {
    let profileModal = await this.modalCtrl.create(LicensemodalPage)
    await profileModal.present();
  }

  contact() {
    this.socialSharing.canShareViaEmail().then(() => {
      this.socialSharing.shareViaEmail('', 'Dronie support', ['josebuleon@gmail.com']);
    });
  }

  //Presenta el toast para salir de la aplicacion
  presentToast() {
    this._translate.get(['TOASTS.EXITMESSAGE']).subscribe(translate => {
      let toast = this.toastCtrl.create({
        message: translate['TOASTS.EXITMESSAGE'],
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }

}
