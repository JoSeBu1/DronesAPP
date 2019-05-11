import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-vervuelo',
  templateUrl: 'vervuelo.html',
})
export class VervueloPage implements OnInit{

  baterias: string;
  distancia: string;
  dron: string;
  lugar: string;
  fecha: any;
  condicionesAtmosfericas: string;
  video: string;
  myVideo: SafeResourceUrl;
  hayVideo: boolean;
  vuelo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer,
    public platform: Platform) {
    this.vuelo = this.navParams.get('item');
  }

  ionViewWillEnter() {
    this.platform.registerBackButtonAction(() => {this.navCtrl.pop()});
  }

  ngOnInit() {
    this.baterias = this.vuelo.baterias;
    this.distancia = this.vuelo.distancia;
    this.dron = this.vuelo.dron;
    this.lugar = this.vuelo.lugar;
    this.fecha = this.vuelo.fecha;
    this.condicionesAtmosfericas = this.vuelo.condicionesAtmosfericas;
    this.video = this.vuelo.video;
    if(this.video != "") {
      this.hayVideo = true;
      var urlVideo: string = this.video;
      console.log(this.video)
      var urlTroceada = urlVideo.split("/");
      var urlReconstruida = urlTroceada[0] + "//" + urlTroceada[2] + "/embed/" + urlTroceada[3].replace("watch?v=", "");
      this.myVideo = this.sanitizer.bypassSecurityTrustResourceUrl(urlReconstruida);
    }
  }

}
