import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vermantenimiento',
  templateUrl: 'vermantenimiento.html',
})
export class VermantenimientoPage implements OnInit{

  precio: number;
  fecha: any;
  descripcion: string;
  mantenimiento: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.mantenimiento = this.navParams.get('item');
  }

  ngOnInit() {
    this.precio = this.mantenimiento.precio;
    this.fecha = this.mantenimiento.fecha;
    this.descripcion = this.mantenimiento.descripcion;
  }

}
