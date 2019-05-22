import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { TranslateService } from '@ngx-translate/core';

interface Noticia {
  titulo: string;
  contenido: string;
  id?: string;
}

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {

  noticiasCollection: AngularFirestoreCollection<Noticia>;
  noticia: Noticia[];
  public counter = 0;

  constructor(public navCtrl: NavController, private angularFirestore: AngularFirestore, private storage: Storage,
    public commondata: CommondataProvider, public toastCtrl: ToastController, private platform: Platform,
    private _translate: TranslateService) {
      this.storage.get('dronActivo').then(x => this.commondata.dronActivo = x);
  }

  ionViewDidEnter() {
    this.noticiasCollection = this.angularFirestore.collection('noticias');
    this.noticiasCollection.snapshotChanges().subscribe(noticiaList => {
      this.noticia = noticiaList.map(item => {
        return {
          titulo: item.payload.doc.data().titulo,
          contenido: item.payload.doc.data().contenido,
          id: item.payload.doc.id
        }
      });
    });
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
