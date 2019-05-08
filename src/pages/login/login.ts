import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { Storage } from '@ionic/storage';
import { TutorialPage } from '../tutorial/tutorial';
import { ContrasenyaolvidadaPage } from '../contrasenyaolvidada/contrasenyaolvidada';
import { NoticiasPage } from '../noticias/noticias';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  pagina: any;
  loading: Loading;

  userGoogle: any = {};
  showUserGoogle: boolean = false;
  userFacebook: any = {};
  showUserFacebook: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController, public commondata: CommondataProvider,
    private storage: Storage, public loadingController: LoadingController, private googlePlus: GooglePlus,
    private facebook: Facebook) { 
  }

  goTo(email: string, password: string) {
    this.loader();
    this.presentLoader();
    this.firebaseProvider.loginUser(email, password).then(user => {
      this.firebaseProvider.Session.subscribe(session => this.commondata.sesionIniciada = session);
      this.storage.get('tutorialViewed').then(x => {
        if(x == false || x == undefined) {
          let destinationPage = this.navParams.get("pagina");
          this.loader();
          this.navCtrl.push(TutorialPage, {destinationPage});
        } else if (this.navParams.get("pagina") == NoticiasPage) {
          this.loader();
          this.navCtrl.setRoot(NoticiasPage);
        } else {
          this.loader();
          this.navCtrl.setRoot(this.navParams.get("pagina"));
        }
      })
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

  goToSignUp() {
    let pagina = this.navParams.get("pagina")
    this.navCtrl.push(SignupPage, {pagina});
  }

  goToForgotPassword(){
    this.navCtrl.push(ContrasenyaolvidadaPage);
  }

  presentLoader() {
    this.loader();
    return this.loading.present();
  }

  stopLoader() {
    this.loading.dismissAll();
    this.loading = null;
  }

  loader() {
    if (this.loading && this.loading.instance){
      this.stopLoader();
    }
    this.loading = this.loadingController.create({
      content: 'Cargando, espere por favor'
    })
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
