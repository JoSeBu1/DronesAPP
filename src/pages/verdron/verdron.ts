import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-verdron',
  templateUrl: 'verdron.html',
})
export class VerdronPage implements OnInit {

  marca: string;
  modelo: string;
  apodo: string;
  fechaAdquisicion: any;
  comentarios: string;
  dron: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dron = this.navParams.get('item');
  }

  ngOnInit() {
    this.marca = this.dron.marca;
    this.modelo = this.dron.modelo;
    this.apodo = this.dron.apodo;
    this.fechaAdquisicion = this.dron.fechaAdquisicion;
    this.comentarios = this.dron.comentarios;
  }

}
