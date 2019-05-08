import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
  @ViewChild(Slides) slides: Slides;

  nextPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.nextPage = this.navParams.get('destinationPage');
  }

  exitTutorial() {
    this.navCtrl.setRoot(this.nextPage);
    this.storage.set('tutorialViewed', true);
  }

}
