import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { VermantenimientoPage } from '../vermantenimiento/vermantenimiento';
import { EditarmantenimientoPage } from '../editarmantenimiento/editarmantenimiento';
import { AnyadirmantenimientoPage } from '../anyadirmantenimiento/anyadirmantenimiento';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

interface Mantenimiento {
  precio: number;
  descripcion: string;
  fecha: string;
  id?: string;
}

@Component({
  selector: 'page-mantenimientos',
  templateUrl: 'mantenimientos.html',
})
export class MantenimientosPage {

  mantenimientosCollection: AngularFirestoreCollection<Mantenimiento>;
  mantenimiento: Mantenimiento[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, 
    public commondata: CommondataProvider,private angularFirestore: AngularFirestore, 
    public alertController: AlertController) {
  }

  ionViewDidEnter() {
    this.storage.get('UID').then( x =>  {
      this.mantenimientosCollection = this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/mantenimientos');
      console.log('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/mantenimientos');
      this.mantenimientosCollection.snapshotChanges().subscribe(dronList => {
        this.mantenimiento = dronList.map(item => {
          return {
            precio: item.payload.doc.data().precio,
            descripcion: item.payload.doc.data().descripcion,
            fecha: item.payload.doc.data().fecha,
            id: item.payload.doc.id
          }
        });
      });
    });
  }

  goToMaintenance(item) {
    this.navCtrl.push(VermantenimientoPage, {item});
  }

  goToEditMaintenance(item) {
    this.navCtrl.push(EditarmantenimientoPage, {item});
  }

  goToDeleteMaintenance(item: Mantenimiento) {
    const alert = this.alertController.create({
      title: 'Se necesita confirmación!',
      message: '¿Estás seguro que quieres eliminar el mantenimiento?',
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
              this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/mantenimientos/${item.id}`).delete();
            })
          }
        }
      ]
    });
    alert.present();
  }

  goToAddMaintenance() {
    this.navCtrl.push(AnyadirmantenimientoPage);
  }

}
