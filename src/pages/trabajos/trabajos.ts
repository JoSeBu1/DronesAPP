import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform, Events } from 'ionic-angular';
import { VertrabajoPage } from '../vertrabajo/vertrabajo';
import { EditartrabajoPage } from '../editartrabajo/editartrabajo';
import { AnyadirtrabajoPage } from '../anyadirtrabajo/anyadirtrabajo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

interface Trabajo {
  descripcion: string;
  precio: string;
  fecha: any;
  pagado: boolean;
  video: string;
  lugar: string;
  id?: string;
}

@Component({
  selector: 'page-trabajos',
  templateUrl: 'trabajos.html',
})
export class TrabajosPage {

  trabajosCollection: AngularFirestoreCollection<Trabajo>;
  trabajo: Trabajo[];
  public counter = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public alertController: AlertController,
    public toastCtrl: ToastController, private platform: Platform, private events: Events, private _translate: TranslateService) {
      this.events.subscribe('dronChanged', (data) => {
        this.ionViewDidEnter();
      });
  }

  //Carga los datos en pantalla
  ionViewDidEnter() {
    if(this.commondata.dronActivo == undefined) {
      this.presentNotPosibleView()
    } else {
      this.storage.get('UID').then( x =>  {
        this.trabajosCollection = this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/trabajos');
        //console.log('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/trabajos');
        this.trabajosCollection.snapshotChanges().subscribe(trabajoList => {
          this.trabajo = trabajoList.map(item => {
            return {
              descripcion: item.payload.doc.data().descripcion,
              precio: item.payload.doc.data().precio,
              fecha: item.payload.doc.data().fecha,
              pagado: item.payload.doc.data().pagado,
              video: item.payload.doc.data().video,
              lugar: item.payload.doc.data().lugar,
              id: item.payload.doc.id
            }
          });
        });
      });
    }
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

  //Va al trabajo
  goToWork(item) {
    this.navCtrl.push(VertrabajoPage, {item});
  }

  //Va a editar trabajo
  goToEditWork(item) {
    this.navCtrl.push(EditartrabajoPage, {item});
  }

  //Elimina el trabajo
  goToDeleteWork(item: Trabajo) {
    this._translate.get(['ALERTCONTROLLER.CONFIRMTITLE', 'ALERTCONTROLLER.DELETEWORKMESSAGE', 'ALERTCONTROLLER.CANCEL', 'ALERTCONTROLLER.ACCEPT']).subscribe(translate => {
      const alert = this.alertController.create({
        title: translate['ALERTCONTROLLER.CONFIRMTITLE'],
        message: translate['ALERTCONTROLLER.DELETEWORKMESSAGE'],
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
                this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/trabajos/${item.id}`).delete();
              })
            }
          }
        ]
      });
      alert.present();
    })
  }

  //Va a añadir trabajo
  goToAddWork() {
    if(this.commondata.dronActivo == undefined) {
      this.presentNotPossibleAdd()
    } else {
      this.navCtrl.push(AnyadirtrabajoPage);
    }
  }

  //Presenta el toast de salir de la aplicacion
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

  //Presenta el toast de que hay que seleccionar un dron
  presentNotPossibleAdd() {
    this._translate.get(['TOASTS.SELECTDRONTRABAJOS']).subscribe(translate => {
      let toast = this.toastCtrl.create({
        message: translate['TOASTS.SELECTDRONTRABAJOS'],
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }

  //Presenta el toast de que hay que seleccionar un dron
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
