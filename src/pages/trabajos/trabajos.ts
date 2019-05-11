import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { VertrabajoPage } from '../vertrabajo/vertrabajo';
import { EditartrabajoPage } from '../editartrabajo/editartrabajo';
import { AnyadirtrabajoPage } from '../anyadirtrabajo/anyadirtrabajo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { Storage } from '@ionic/storage';

interface Trabajo {
  descripcion: string;
  precio: string;
  fecha: any;
  id?: string;
}

@Component({
  selector: 'page-trabajos',
  templateUrl: 'trabajos.html',
})
export class TrabajosPage {

  trabajosCollection: AngularFirestoreCollection<Trabajo>;
  trabajo: Trabajo[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public alertController: AlertController) {
  }

  ionViewDidEnter() {
    this.storage.get('UID').then( x =>  {
      this.trabajosCollection = this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/trabajos');
      console.log('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/trabajos');
      this.trabajosCollection.snapshotChanges().subscribe(trabajoList => {
        this.trabajo = trabajoList.map(item => {
          return {
            descripcion: item.payload.doc.data().descripcion,
            precio: item.payload.doc.data().precio,
            fecha: item.payload.doc.data().fecha,
            id: item.payload.doc.id
          }
        });
      });
    });
  }

  goToWork(item) {
    this.navCtrl.push(VertrabajoPage, {item});
  }

  goToEditWork(item) {
    this.navCtrl.push(EditartrabajoPage, {item});
  }

  goToDeleteWork(item: Trabajo) {
    const alert = this.alertController.create({
      title: 'Se necesita confirmación!',
      message: '¿Estás seguro que quieres eliminar el trabajo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //Cancela
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.storage.get('UID').then( x =>  {
              this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/trabajos/${item.id}`).delete();
            })
          }
        }
      ]
    });
    alert.present();
  }

  goToAddWork(){
    this.navCtrl.push(AnyadirtrabajoPage);
  }

}
