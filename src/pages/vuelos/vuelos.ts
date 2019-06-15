import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, Platform, Events } from 'ionic-angular';
import { VervueloPage } from '../vervuelo/vervuelo';
import { AnyadirvueloPage } from '../anyadirvuelo/anyadirvuelo';
import { EditarvueloPage } from '../editarvuelo/editarvuelo';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { TranslateService } from '@ngx-translate/core';

interface Vuelo {
  baterias: string;
  distancia: string;
  lugar: string;
  fecha: any;
  condicionesAtmosfericas: string;
  video: string;
  id?: string;
}

@Component({
  selector: 'page-vuelos',
  templateUrl: 'vuelos.html',
})
export class VuelosPage {

  vuelosCollection: AngularFirestoreCollection<Vuelo>;
  vuelo: Vuelo[];
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
        this.vuelosCollection = this.angularFirestore.collection('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/vuelos');
        //console.log('usuarios/' + x + '/drones/' + this.commondata.dronActivo.id +'/vuelos');
        this.vuelosCollection.snapshotChanges().subscribe(vueloList => {
          this.vuelo = vueloList.map(item => {
            return {
              baterias: item.payload.doc.data().baterias,
              distancia: item.payload.doc.data().distancia,
              lugar: item.payload.doc.data().lugar,
              fecha: item.payload.doc.data().fecha,
              condicionesAtmosfericas: item.payload.doc.data().condicionesAtmosfericas,
              video: item.payload.doc.data().video,
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

  //Va al vuelo
  goToFly(item) {
    this.navCtrl.push(VervueloPage, {item});
  }

  //Va a editar el vuelo
  goToEditFly(item) {
    this.navCtrl.push(EditarvueloPage, {item});
  }

  //Va a eliminar el vuelo
  goToDeleteFly(item: Vuelo) {
    this._translate.get(['ALERTCONTROLLER.CONFIRMTITLE', 'ALERTCONTROLLER.DELETEFLYMESSAGE', 'ALERTCONTROLLER.CANCEL', 'ALERTCONTROLLER.ACCEPT']).subscribe(translate => {
      const alert = this.alertController.create({
        title: translate['ALERTCONTROLLER.CONFIRMTITLE'],
        message: translate['ALERTCONTROLLER.DELETEFLYMESSAGE'],
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
                this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/vuelos/${item.id}`).delete();
              })
            }
          }
        ]
      });
      alert.present();
    })
  }

  //Va a añadir un vuelo
  goToAddFly() {
    if(this.commondata.dronActivo == undefined) {
      this.presentNotPossibleAdd()
    } else {
      this.navCtrl.push(AnyadirvueloPage);
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

  //Presenta el toast de que hay que seleccionar un dron
  presentNotPossibleAdd() {
    this._translate.get(['TOASTS.SELECTDRONVUELOS']).subscribe(translate => {
      let toast = this.toastCtrl.create({
        message: translate['TOASTS.SELECTDRONVUELOS'],
        duration: 2000,
        position: "bottom"
      });
      toast.present();
    })
  }

  //Presenta un toast de que hay que seleccionar un dron
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
