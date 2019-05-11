import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { TranslateService } from '@ngx-translate/core';

import { NoticiasPage } from '../pages/noticias/noticias';
import { MapavueloPage } from '../pages/mapavuelo/mapavuelo';
import { VuelosPage } from '../pages/vuelos/vuelos';
import { MantenimientosPage } from '../pages/mantenimientos/mantenimientos';
import { TrabajosPage } from '../pages/trabajos/trabajos';
import { DronesPage } from '../pages/drones/drones';
import { AcercadePage } from '../pages/acercade/acercade';
import { LoginPage } from '../pages/login/login';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { CommondataProvider } from '../providers/commondata/commondata';
import { PreguntasfrecuentesPage } from '../pages/preguntasfrecuentes/preguntasfrecuentes';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NoticiasPage;
  activePage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    private firebaseProvider: FirebaseProvider, private toastController: ToastController, public commondata: CommondataProvider,
    private angularFirestore: AngularFirestore, private storage: Storage, private appVersion: AppVersion,
    private _translate: TranslateService) {
    this.initializeApp();
    this.appVersion.getVersionNumber().then((version) => {
      this.commondata.app = version;
    }).catch(e => console.log(e));

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'SIDEMENU.NOTICIAS', component: NoticiasPage, icon: "custom-news" },
      { title: 'SIDEMENU.DRONES', component: DronesPage, icon: "custom-drone" },
      { title: 'SIDEMENU.VUELOS', component: VuelosPage, icon: "custom-flight" },
      { title: 'SIDEMENU.MANTENIMIENTOS', component: MantenimientosPage, icon: "custom-maintenance" },
      { title: 'SIDEMENU.TRABAJOS', component: TrabajosPage, icon: "custom-work" },
      { title: 'SIDEMENU.FAQ', component: PreguntasfrecuentesPage, icon: "custom-faq" },
      { title: 'SIDEMENU.MAPA', component: MapavueloPage, icon: "custom-map" },
      { title: 'SIDEMENU.ACERCA', component: AcercadePage, icon: "custom-info" }
    ];
    this.activePage = this.pages[0];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      let userLang = navigator.language.split('-')[0];
      this.commondata.locale = navigator.language;
      this._translate.use(userLang);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.overlaysWebView(false);
      this.hideSplashScreen();
      this.storage.get('UID').then(x =>  {
        if(x == '' || x == null || x == undefined) {
          //No hay X
        } else {
          this.firebaseProvider.Session.subscribe(session => this.commondata.sesionIniciada = session);
          this.commondata.dronesCollection = this.angularFirestore.collection('usuarios/' + x + '/drones');
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
          this.angularFirestore.doc('usuarios/' + x).ref.get().then(doc =>
            this.commondata.usuario = doc.data().usuario
          );
          this.angularFirestore.doc('usuarios/' + x).ref.get().then(doc =>
            this.commondata.email = doc.data().email
          );
        }
      });
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    this.activePage = page;
    let pagina = page.component;
    this.firebaseProvider.Session.subscribe((session) => {
      if (page.component == MapavueloPage) {
        this.nav.setRoot(MapavueloPage);
      } else if (page.component == NoticiasPage) {
        this.nav.setRoot(NoticiasPage);
      } else if (page.component == PreguntasfrecuentesPage) {
        this.nav.setRoot(PreguntasfrecuentesPage);
      } else if (page.component == AcercadePage) {
        this.nav.setRoot(AcercadePage);
      } else if (session) {
        this.nav.setRoot(page.component);
      } else {
        this.nav.push(LoginPage, {pagina});
        const toast = this.toastController.create({
          message: 'Si no estas logeado no puedes acceder a Drones, Vuelos, Mantenimientos y trabajos, logeate para tener acceso total',
          showCloseButton: true,
          position: 'bottom',
          closeButtonText: 'Cerrar',
          duration: 4500
        });
        toast.present();
      }
    });
  }

  checkActive(page) {
    return page == this.activePage;
  }

  cambioSelect() {
    this.storage.set('dronActivo', this.commondata.dronActivo);
  }

  logout() {
    if (this.commondata.sesionIniciadaConCorreo == true) {
      this.firebaseProvider.logout();
      this.commondata.sesionIniciadaConCorreo = false;
    } else if (this.commondata.sesionIniciadaConGoogle == true) {
      this.firebaseProvider.googleLogout();
      this.commondata.sesionIniciadaConGoogle = false;
    } else if (this.commondata.sesionIniciadaConFacebook == true) {
      this.firebaseProvider.facebookLogout();
      this.commondata.sesionIniciadaConFacebook = false;
    }
    this.nav.setRoot(NoticiasPage);
    this.activePage = NoticiasPage;
    this.storage.set('dronActivo', '');
    this.commondata.dronActivo = undefined;
    this.commondata.sesionIniciada = false;
    
  }

  goToLogIn() {
    let pagina = NoticiasPage;
    this.nav.push(LoginPage, {pagina});
  }
}

