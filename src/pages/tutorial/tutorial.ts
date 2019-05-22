import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, ToastController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;

  nextPage: any;
  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public toastCtrl: ToastController, private platform: Platform, private _translate: TranslateService) {
    this.nextPage = this.navParams.get('destinationPage');
  }

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

  exitTutorial() {
    this.navCtrl.setRoot(this.nextPage);
    this.storage.set('tutorialViewed', true);
  }

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
