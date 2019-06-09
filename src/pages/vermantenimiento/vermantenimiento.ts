import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

@Component({
  selector: 'page-vermantenimiento',
  templateUrl: 'vermantenimiento.html',
})
export class VermantenimientoPage implements OnInit{

  precio: number;
  fecha: any;
  descripcion: string;
  titulo: string;
  mantenimiento: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
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
  }

}
