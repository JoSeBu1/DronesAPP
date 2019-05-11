import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { VerdronPage } from '../verdron/verdron';
import { AnyadirdronPage } from '../anyadirdron/anyadirdron';
import { EditardronPage } from '../editardron/editardron';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-drones',
  templateUrl: 'drones.html',
})
export class DronesPage {

  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public alertController: AlertController,
    public toastCtrl: ToastController, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.storage.get('UID').then( x =>  {
      this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + x + '/drones');
      this.commondata.dronesCollection.snapshotChanges().subscribe(dronList => {
        this.commondata.dron = dronList.map(item => {
          return {
            apodo: item.payload.doc.data().apodo,
            marca: item.payload.doc.data().marca,
            modelo: item.payload.doc.data().modelo,
            fechaAdquisicion: item.payload.doc.data().fechaAdquisicion,
            comentarios: item.payload.doc.data().comentarios,
            id: item.payload.doc.id
          }
        });
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

  goToDron(item) {
    this.navCtrl.push(VerdronPage, {item});
  }

  goToEditDron(item) {
    this.navCtrl.push(EditardronPage, {item});
  }

  goToDeleteDron(item: any) {
    const alert = this.alertController.create({
      title: 'Se necesita confirmación!',
      message: '¿Estás seguro que quieres eliminar el dron? También se eliminarán los datos que le hagan referencia.',
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
              this.angularFirestore.doc(`usuarios/${x}/drones/${item.id}`).delete();
            })
          }
        }
      ]
    });
    alert.present();
  }

  goToAddDron() {
    this.navCtrl.push(AnyadirdronPage);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Presiona otra vez para salir de la aplicación",
      duration: 2000,
      position: "bottom"
    });
    toast.present();
  }

}
