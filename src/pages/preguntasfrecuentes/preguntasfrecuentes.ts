import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore) {
  }

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

}
