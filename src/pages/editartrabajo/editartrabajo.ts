import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';

@Component({
  selector: 'page-editartrabajo',
  templateUrl: 'editartrabajo.html',
})
export class EditartrabajoPage {

  precio: number;
  fecha: any;
  descripcion: string;
  pagado: boolean;
  video: string;
  lugar: string;
  trabajo: any;

  public date; 
  public myFecha;


  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
      this.trabajo = this.navParams.get('item');
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  ngOnInit() {
    this.precio = this.trabajo.precio;
    this.fecha = this.trabajo.fecha;
    this.descripcion = this.trabajo.descripcion;
    this.pagado = this.trabajo.pagado;
    this.lugar = this.trabajo.lugar;
    this.video = this.trabajo.video;
    if(this.fecha.day != undefined && this.fecha.month != undefined && this.fecha.year != undefined) {
      this.date = new Date().setFullYear(this.fecha.year, this.fecha.month-1, this.fecha.day);
      this.myFecha = new Date(this.date).toISOString();
    }
  }

  editTrabajo(fecha) {
    let precio = this.precio;
    let descripcion = this.descripcion;
    let pagado = this.pagado;
    let video = this.video;
    let lugar = this.lugar;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/trabajos/${this.trabajo.id}`).update({lugar, precio, fecha, descripcion, pagado, video});
    });
    this.navCtrl.popToRoot();
  }

}
