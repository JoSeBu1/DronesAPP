import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TranslateService } from '@ngx-translate/core';

interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
  id?: string;
}

@Component({
  selector: 'page-preguntasfrecuentes',
  templateUrl: 'preguntasfrecuentes.html',
})
export class PreguntasfrecuentesPage {

  preguntasfrecuentesCollection: AngularFirestoreCollection<PreguntaFrecuente>;
  preguntafrecuente: PreguntaFrecuente[];
  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    public toastCtrl: ToastController, private platform: Platform, private _translate: TranslateService) {
  }

  //Carga las preguntas en la pantalla
  ionViewDidEnter() {
    this.preguntasfrecuentesCollection = this.angularFirestore.collection('preguntasfrecuentes');
    this.preguntasfrecuentesCollection.snapshotChanges().subscribe(preguntafrecuenteList => {
      this.preguntafrecuente = preguntafrecuenteList.map(item => {
        return {
          pregunta: item.payload.doc.data().pregunta,
          respuesta: item.payload.doc.data().respuesta,
          id: item.payload.doc.id
        }
      });
    });
  }

  //Ejecuta una accion al abrirse la pantalla
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
