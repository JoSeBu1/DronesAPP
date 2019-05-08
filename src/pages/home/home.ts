import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any = {};
  showUser: boolean = false;

  constructor(public navCtrl: NavController, private loadingController: LoadingController, private googlePlus: GooglePlus) {

  }

  async doGoogleLogin(){
  	const loading = await this.loadingController.create({
  		content: 'Please wait...'
  	});
  	this.presentLoading(loading);
  
  	this.googlePlus.login({
  		'scopes': 'profile', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  		'webClientId': '678325328944-cm2ml3tuee13alvgme5b7qlrcuocb8ll.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  		'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  	})
  	.then(user =>{
      this.user = user;
      this.showUser = true; 
      loading.dismiss();
  	}, err =>{
  		console.log(err)
      loading.dismiss();
      alert(err);
  	});
  
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  doGoogleLogout(){
    this.googlePlus.logout()
    .then(res =>{
    }, err =>{
      console.log(err);
    })
  }

}
