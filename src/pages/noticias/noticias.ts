import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

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

  constructor(public navCtrl: NavController, private angularFirestore: AngularFirestore, private storage: Storage,
    public commondata: CommondataProvider) {
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

}
