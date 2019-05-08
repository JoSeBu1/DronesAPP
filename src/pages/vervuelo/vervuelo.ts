import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-vervuelo',
  templateUrl: 'vervuelo.html',
})
export class VervueloPage implements OnInit{

  baterias: string;
  distancia: string;
  dron: string;
  lugar: string;
  fecha: string;
  condicionesAtmosfericas: string;
  vuelo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vuelo = this.navParams.get('item');
  }

  ngOnInit() {
    this.baterias = this.vuelo.baterias;
    this.distancia = this.vuelo.distancia;
    this.dron = this.vuelo.dron;
    this.lugar = this.vuelo.lugar;
    this.fecha = this.vuelo.fecha;
    this.condicionesAtmosfericas = this.vuelo.condicionesAtmosfericas;
  }

}
