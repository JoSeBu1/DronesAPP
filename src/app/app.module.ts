import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

export const firebaseConfig = {
  apiKey: "AIzaSyCqkOgOFcf1Vx_EKoIAZLmsmhn83WLhnKY",
    authDomain: "dbdrones-1bdaf.firebaseapp.com",
    databaseURL: "https://dbdrones-1bdaf.firebaseio.com",
    projectId: "dbdrones-1bdaf",
    storageBucket: "dbdrones-1bdaf.appspot.com",
    messagingSenderId: "573084995226",
    appId: "1:573084995226:web:35ef6249fce20a09"
};

import { MyApp } from './app.component';
import { MapavueloPage } from '../pages/mapavuelo/mapavuelo';
import { MantenimientosPage } from '../pages/mantenimientos/mantenimientos';
import { VuelosPage } from '../pages/vuelos/vuelos';
import { TrabajosPage } from '../pages/trabajos/trabajos';
import { AnyadirvueloPage } from '../pages/anyadirvuelo/anyadirvuelo';
import { EditarvueloPage } from '../pages/editarvuelo/editarvuelo';
import { VervueloPage } from '../pages/vervuelo/vervuelo';
import { DronesPage } from '../pages/drones/drones';
import { VerdronPage } from '../pages/verdron/verdron';
import { EditardronPage } from '../pages/editardron/editardron';
import { AnyadirdronPage } from '../pages/anyadirdron/anyadirdron';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AcercadePage } from '../pages/acercade/acercade';
import { VermantenimientoPage } from '../pages/vermantenimiento/vermantenimiento';
import { AnyadirmantenimientoPage } from '../pages/anyadirmantenimiento/anyadirmantenimiento';
import { EditarmantenimientoPage } from '../pages/editarmantenimiento/editarmantenimiento';
import { EditartrabajoPage } from '../pages/editartrabajo/editartrabajo';
import { VertrabajoPage } from '../pages/vertrabajo/vertrabajo';
import { AnyadirtrabajoPage } from '../pages/anyadirtrabajo/anyadirtrabajo';
import { PreguntasfrecuentesPage } from '../pages/preguntasfrecuentes/preguntasfrecuentes';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ContrasenyaolvidadaPage } from '../pages/contrasenyaolvidada/contrasenyaolvidada';
import { NoticiasPage } from '../pages/noticias/noticias';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { CommondataProvider } from '../providers/commondata/commondata';
import { LicensemodalPage } from '../pages/licensemodal/licensemodal';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    MyApp,
    NoticiasPage,
    MapavueloPage,
    MantenimientosPage,
    VuelosPage,
    TrabajosPage,
    DronesPage,
    AnyadirvueloPage,
    EditarvueloPage,
    VervueloPage,
    VerdronPage,
    EditardronPage,
    AnyadirdronPage,
    AcercadePage,
    VermantenimientoPage,
    AnyadirmantenimientoPage,
    EditarmantenimientoPage,
    VertrabajoPage,
    EditartrabajoPage,
    AnyadirtrabajoPage,
    PreguntasfrecuentesPage,
    TutorialPage,
    ContrasenyaolvidadaPage,
    LicensemodalPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
         provide: TranslateLoader,
         useFactory: customTranslateLoader,
         deps: [HttpClient]
      }
     }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    LoginPage,
    SignupPage,
    MyApp,
    NoticiasPage,
    MapavueloPage,
    MantenimientosPage,
    VuelosPage,
    TrabajosPage,
    DronesPage,
    AnyadirvueloPage,
    EditarvueloPage,
    VervueloPage,
    VerdronPage,
    EditardronPage,
    AnyadirdronPage,
    AcercadePage,
    VermantenimientoPage,
    AnyadirmantenimientoPage,
    EditarmantenimientoPage,
    VertrabajoPage,
    EditartrabajoPage,
    AnyadirtrabajoPage,
    PreguntasfrecuentesPage,
    TutorialPage,
    ContrasenyaolvidadaPage,
    LicensemodalPage
  ],
  providers: [
    FirebaseProvider,
    CommondataProvider,
    StatusBar,
    SplashScreen,
    GooglePlus,
    Facebook,
    AppVersion,
    TranslateModule,
    LocalNotifications,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
