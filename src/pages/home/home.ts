import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userGoogle: any = {};
  showUserGoogle: boolean = false;
  userFacebook: any = {};
  showUserFacebook: boolean = false;

  constructor(public navCtrl: NavController, private loadingController: LoadingController, private googlePlus: GooglePlus,
    private facebook: Facebook) {

  }

  async doGoogleLogin(){
  	const loading = await this.loadingController.create({
  		content: 'Please wait...'
  	});
  	this.presentLoading(loading);
  
  	this.googlePlus.login({
  		'scopes': 'profile', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  		'webClientId': '573084995226-vtptdl6v4q4l2g6drha3qekgd7h5hj96.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  		'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  	})
  	.then(user =>{
      this.userGoogle = user;
      this.showUserGoogle = true; 
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

  loginFacebook() {
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      console.log(rta.status);
      if(rta.status == 'connected'){
        this.getInfo();
      };
    })
    .catch(error =>{
      console.error( error );
    });
  }

  getInfo() {
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
      this.showUserFacebook = true; 
      this.userFacebook = data;
    })
    .catch(error =>{
      console.error( error );
    });
  }

}
