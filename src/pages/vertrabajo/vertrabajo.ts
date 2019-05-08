import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vertrabajo',
  templateUrl: 'vertrabajo.html',
})
export class VertrabajoPage implements OnInit{

  precio: number;
  fecha: string;
  descripcion: string;
  trabajo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.trabajo = this.navParams.get('item');
  }

  ngOnInit() {
    this.precio = this.trabajo.precio;
    this.fecha = this.trabajo.fecha;
    this.descripcion = this.trabajo.descripcion;
  }

}
