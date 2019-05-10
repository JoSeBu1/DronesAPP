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
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


export interface GoogleUserId { id: string; }
export interface FacebookUserId { id: string; }

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  pagina: any;
  loading: Loading;

  googleUsersIds: GoogleUserId[];
  googleUsersIdsCollection: AngularFirestoreCollection<GoogleUserId>;
  facebookUsersIds: FacebookUserId[];
  facebookUsersIdsCollection: AngularFirestoreCollection<FacebookUserId>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public firebaseProvider: FirebaseProvider, public alertCtrl: AlertController, public commondata: CommondataProvider,
    private storage: Storage, public loadingController: LoadingController, private googlePlus: GooglePlus,
    private facebook: Facebook, private angularFirestore: AngularFirestore) { 
  }

  goTo(email: string, password: string) {
    this.loader();
    this.presentLoader();
    this.firebaseProvider.loginUser(email, password).then(user => {
      this.firebaseProvider.Session.subscribe(session => {
        this.commondata.sesionIniciada = session
        this.commondata.sesionIniciadaConCorreo = true;
      });
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

  async doGoogleLogin() {
    this.loader();
  	this.presentLoader();
  	this.googlePlus.login({
  		'scopes': 'profile', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  		'webClientId': '573084995226-vtptdl6v4q4l2g6drha3qekgd7h5hj96.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  		'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  	})
  	.then(user => {
      this.googleUsersIdsCollection = this.angularFirestore.collection('usuarios');
      this.googleUsersIdsCollection.snapshotChanges().subscribe(googleUsersIdsList => {
        this.googleUsersIds = googleUsersIdsList.map(item => {
          return {
            id: item.payload.doc.id
          }
        });
        let existe: boolean;
        for(let i = 0; i < this.googleUsersIds.length; i++) {
          if(this.googleUsersIds[i].id == user.userId) {
            existe = true;
          }
        }
        if(existe == true) {
          this.storage.set('UID', user.userId);
          this.commondata.usuario = user.displayName;
          this.commondata.email = user.email;
          this.commondata.photoUrl = user.imageUrl;
          this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + user.user.uid + '/drones');
          this.commondata.dronesCollection.snapshotChanges().subscribe(dronList => {
            this.commondata.dron = dronList.map(item => {
              return {
                apodo: item.payload.doc.data().apodo,
                marca: item.payload.doc.data().marca,
                modelo: item.payload.doc.data().modelo,
                anyoAdquisicion: item.payload.doc.data().anyoAdquisicion,
                comentarios: item.payload.doc.data().comentarios,
                id: item.payload.doc.id
              }
            });
          });
        } else {
          let email = user.email;
          let usuario = user.displayName;
          let photoUrl = user.imageUrl;
          this.angularFirestore.doc('usuarios/' + user.userId).set({email, usuario, photoUrl});
          this.storage.set('UID', user.userId);
          this.commondata.usuario = user.displayName;
          this.commondata.email = user.email;
          this.commondata.photoUrl = user.imageUrl;
        }
      });
      this.commondata.sesionIniciada = true;
      this.commondata.sesionIniciadaConGoogle = true;
        this.storage.get('tutorialViewed').then(x => {
          if(x == false || x == undefined) {
            let destinationPage = this.navParams.get("pagina");
            this.navCtrl.push(TutorialPage, {destinationPage});
          } else if (this.navParams.get("pagina") == NoticiasPage) {
            this.navCtrl.setRoot(NoticiasPage);
          } else {
          this.navCtrl.setRoot(this.navParams.get("pagina"));
        }
      })
      this.loader();
  	}, err => {
  		console.log(err)
      this.loader();
  	});
  }

  loginFacebook() {
    this.facebook.login(['public_profile', 'email'])
    .then(rta => {
      if(rta.status == 'connected'){
        this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
          .then(user => {
            this.facebookUsersIdsCollection = this.angularFirestore.collection('usuarios');
            this.facebookUsersIdsCollection.snapshotChanges().subscribe(facebookUsersIdsList => {
              this.facebookUsersIds = facebookUsersIdsList.map(item => {
                return {
                  id: item.payload.doc.id
                }
              });
              let existe: boolean;
              for(let i = 0; i < this.googleUsersIds.length; i++) {
                if(this.facebookUsersIds[i].id == user.id) {
                  existe = true;
                }
              }
              if(existe == true) {
                this.storage.set('UID', user.id);
                this.commondata.usuario = user.name;
                this.commondata.email = user.email;
                this.commondata.photoUrl = user.picture.data.url;
                this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + user.user.uid + '/drones');
                this.commondata.dronesCollection.snapshotChanges().subscribe(dronList => {
                  this.commondata.dron = dronList.map(item => {
                    return {
                      apodo: item.payload.doc.data().apodo,
                      marca: item.payload.doc.data().marca,
                      modelo: item.payload.doc.data().modelo,
                      anyoAdquisicion: item.payload.doc.data().anyoAdquisicion,
                      comentarios: item.payload.doc.data().comentarios,
                      id: item.payload.doc.id
                    }
                  });
                });
              } else {
                let email = user.email;
                let usuario = user.name;
                let photoUrl = user.picture.data.url;
                this.angularFirestore.doc('usuarios/' + user.id).set({email, usuario, photoUrl});
                this.storage.set('UID', user.id);
                this.commondata.usuario = user.name;
                this.commondata.email = user.email;
                this.commondata.photoUrl = user.picture.data.url;
              }
            });
            this.commondata.sesionIniciada = true;
            this.commondata.sesionIniciadaConFacebook = true;
              this.storage.get('tutorialViewed').then(x => {
                if(x == false || x == undefined) {
                  let destinationPage = this.navParams.get("pagina");
                  this.navCtrl.push(TutorialPage, {destinationPage});
                } else if (this.navParams.get("pagina") == NoticiasPage) {
                  this.navCtrl.setRoot(NoticiasPage);
                } else {
                this.navCtrl.setRoot(this.navParams.get("pagina"));
              }
            })
          })
          .catch(error => {
            console.error( error );
          });
      };
    })
    .catch(error => {
      console.error( error );
    });
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

  loader() {
    if (this.loading && this.loading.instance){
      this.stopLoader();
    }
    this.loading = this.loadingController.create({
      content: 'Cargando, espere por favor'
    })
  }

  stopLoader() {
    this.loading.dismissAll();
    this.loading = null;
  }

}
