import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';


@Component({
  selector: 'page-editarmantenimiento',
  templateUrl: 'editarmantenimiento.html',
})
export class EditarmantenimientoPage implements OnInit{

  precio: number;
  fecha: any;
  descripcion: string;
  titulo: string;
  mantenimiento: any;

  public date; 
  public myFecha;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, public platform: Platform) {
    this.mantenimiento = this.navParams.get('item');
  }

  //Ejecuta una accion al abrirse la pantalla
  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  //Carga los datos en la pantalla
  ngOnInit() {
    this.precio = this.mantenimiento.precio;
    this.fecha = this.mantenimiento.fecha;
    this.descripcion = this.mantenimiento.descripcion;
    this.titulo = this.mantenimiento.titulo;
    if(this.fecha.day != undefined && this.fecha.month != undefined && this.fecha.year != undefined) {
      this.date = new Date().setFullYear(this.fecha.year, this.fecha.month-1, this.fecha.day);
      this.myFecha = new Date(this.date).toISOString();
    }
  }

  //Edita el mantenimiento
  editMantenimiento(fecha) {
    let precio = this.precio;
    let descripcion = this.descripcion;
    let titulo = this.titulo;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.commondata.dronActivo.id}/mantenimientos/${this.mantenimiento.id}`).update({titulo, precio, fecha, descripcion});
    });
    this.navCtrl.popToRoot();
  }

}
