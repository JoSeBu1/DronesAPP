import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-editardron',
  templateUrl: 'editardron.html',
})
export class EditardronPage implements OnInit{

  marca: string;
  modelo: string;
  apodo: string;
  anyoAdquisicion: number;
  comentarios: string;
  dron: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private angularFirestore: AngularFirestore,
    private storage: Storage) {
    this.dron = this.navParams.get('item');
  }

  ngOnInit() {
    this.marca = this.dron.marca;
    this.modelo = this.dron.modelo;
    this.apodo = this.dron.apodo;
    this.anyoAdquisicion = this.dron.anyoAdquisicion;
    this.comentarios = this.dron.comentarios;
  }

  editDron() {
    let apodo = this.apodo;
    let marca = this.marca;
    let modelo = this.modelo;
    let anyoAdquisicion = this.anyoAdquisicion;
    let comentarios = this.comentarios;
    this.storage.get('UID').then( x =>  {  
      this.angularFirestore.doc(`usuarios/${x}/drones/${this.dron.id}`).update({apodo, marca, modelo, anyoAdquisicion, comentarios});
    });
    this.navCtrl.popToRoot();
  }

}