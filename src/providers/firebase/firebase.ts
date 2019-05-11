import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { CommondataProvider } from '../../providers/commondata/commondata';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';


@Injectable()
export class FirebaseProvider {

  constructor(private afAuth: AngularFireAuth, private angularFirestore: AngularFirestore,
    private storage: Storage, public commondata: CommondataProvider, private googlePlus: GooglePlus,
    private facebook: Facebook) {
  }

  registerUser(email: string, password: string, usuario: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
      this.angularFirestore.doc('usuarios/' + res.user.uid).set({email, usuario});
      this.storage.set('UID', res.user.uid);
      this.commondata.usuario = usuario;
      this.commondata.email = email;
      this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + res.user.uid + '/drones');
      this.commondata.dronesCollection.snapshotChanges().subscribe(dronList => {
        this.commondata.dron = dronList.map(item => {
          return {
            apodo: item.payload.doc.data().apodo,
            marca: item.payload.doc.data().marca,
            modelo: item.payload.doc.data().modelo,
            fechaAdquisicion: item.payload.doc.data().fechaAdquisicion,
            comentarios: item.payload.doc.data().comentarios,
            id: item.payload.doc.id
          }
        });
      });
    }).catch(err => Promise.reject(err))
  }

  loginUser(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => {
        Promise.resolve(user); 
        this.storage.set('UID', user.user.uid);
        this.commondata.email = email;
        this.angularFirestore.doc('usuarios/' + user.user.uid).ref.get().then(doc =>
            this.commondata.usuario = doc.data().usuario
        );
        this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + user.user.uid + '/drones');
        this.commondata.dronesCollection.snapshotChanges().subscribe(dronList => {
          this.commondata.dron = dronList.map(item => {
            return {
              apodo: item.payload.doc.data().apodo,
              marca: item.payload.doc.data().marca,
              modelo: item.payload.doc.data().modelo,
              fechaAdquisicion: item.payload.doc.data().fechaAdquisicion,
              comentarios: item.payload.doc.data().comentarios,
              id: item.payload.doc.id
            }
          });
        });
      }).catch(err => Promise.reject(err))
  }

  forgotPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  get Session() {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.storage.set('UID', '');
    });
  }

  googleLogout() {
    this.googlePlus.logout()
    .then(() => {
      this.storage.set('UID', '');
    });
  }

  facebookLogout() {
    this.facebook.logout()
    .then(() => {
      this.storage.set('UID', '');
    });
  }

}
