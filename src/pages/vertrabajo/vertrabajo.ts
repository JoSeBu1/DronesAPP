import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-vertrabajo',
  templateUrl: 'vertrabajo.html',
})
export class VertrabajoPage implements OnInit{

  precio: number;
  fecha: any;
  descripcion: string;
  pagado: boolean;
  video: string;
  myVideo: SafeResourceUrl;
  hayVideo: boolean;
  trabajo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer) {
    this.trabajo = this.navParams.get('item');
  }

  ngOnInit() {
    this.precio = this.trabajo.precio;
    this.fecha = this.trabajo.fecha;
    this.descripcion = this.trabajo.descripcion;
    this.pagado = this.trabajo.pagado;
    this.video = this.trabajo.video;
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
