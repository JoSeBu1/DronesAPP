import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform, Events } from 'ionic-angular';
import { VermantenimientoPage } from '../vermantenimiento/vermantenimiento';
import { EditarmantenimientoPage } from '../editarmantenimiento/editarmantenimiento';
import { AnyadirmantenimientoPage } from '../anyadirmantenimiento/anyadirmantenimiento';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { TranslateService } from '@ngx-translate/core';

interface Mantenimiento {
  precio: number;
  descripcion: string;
  fecha: any;
  titulo: string;
  id?: string;
}

@Component({
  selector: 'page-mantenimientos',
  templateUrl: 'mantenimientos.html',
})
export class MantenimientosPage {

  mantenimientosCollection: AngularFirestoreCollection<Mantenimiento>;
  mantenimiento: Mantenimiento[];
  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, 
    public commondata: CommondataProvider,private angularFirestore: AngularFirestore, 
    public alertController: AlertController, public toastCtrl: ToastController, private platform: Platform, 
    private events: Events, private _translate: TranslateService) {
      this.events.subscribe('dronChanged', (data) => {
        this.ionViewDidEnter();
      });
  }

  //Carga la informancion en la pantalla al abrirse
  ionViewDidEnter() {
    if(this.commondata.dronActivo == undefined) {
      this.presentNotPosibleView()
    } else {
      this.storage.get('UID').then( x =>  {
        this.mantenimientosCollection = this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/mantenimientos');
        //console.log('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/mantenimientos');
        this.mantenimientosCollection.snapshotChanges().subscribe(dronList => {
          this.mantenimiento = dronList.map(item => {
            return {
              precio: item.payload.doc.data().precio,
              descripcion: item.payload.doc.data().descripcion,
              fecha: item.payload.doc.data().fecha,
              titulo: item.payload.doc.data().titulo,
              id: item.payload.doc.id
            }
          });
        });
      });
    } 
  }

  //Ejecuta una accion al abrirse la pagina
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

  //Va a mantenimiento
  goToMaintenance(item) {
    this.navCtrl.push(VermantenimientoPage, {item});
  }

  //Va a editar mantenimiento
  goToEditMaintenance(item) {
    this.navCtrl.push(EditarmantenimientoPage, {item});
  }

  //Elimina el mantenimiento
  goToDeleteMaintenance(item: Mantenimiento) {
    this._translate.get(['ALERTCONTROLLER.CONFIRMTITLE', 'ALERTCONTROLLER.DELETEMAINTENANCEMESSAGE', 'ALERTCONTROLLER.CANCEL', 'ALERTCONTROLLER.ACCEPT']).subscribe(translate => {
      const alert = this.alertController.create({
        title: translate['ALERTCONTROLLER.CONFIRMTITLE'],
        message: translate['ALERTCONTROLLER.DELETEMAINTENANCEMESSAGE'],
        buttons: [
          {
            text: translate['ALERTCONTROLLER.CANCEL'],
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              //Cancela
            }
          }, {
            text: translate['ALERTCONTROLLER.ACCEPT'],
            handler: () => {
              this.storage.get('UID').then( x =>  {
                this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/mantenimientos/${item.id}`).delete();
              })
            }
          }
        ]
      });
      alert.present();
    })
  }

  //Va a editar mantenimiento
  goToAddMaintenance() {
    if(this.commondata.dronActivo == undefined) {
      this.presentNotPossibleAdd()
    } else {
      this.navCtrl.push(AnyadirmantenimientoPage);
    }
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

  //Presenta el toast de que no es posible añadir mantenimientos
  presentNotPossibleAdd() {
    this._translate.get(['TOASTS.SELECTDRONMANTENIMIENTOS']).subscribe(translate => {
      let toast = this.toastCtrl.create({
        message: translate['TOASTS.SELECTDRONMANTENIMIENTOS'],
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }

  //Presenta el toast de que tiene que seleccionar un dron
  presentNotPosibleView() {
    this._translate.get(['TOASTS.SELECTDRON']).subscribe(translate => {
      let toast = this.toastCtrl.create({
        message: translate['TOASTS.SELECTDRON'],
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }

}
