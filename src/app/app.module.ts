import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { 
  HistorialPage,
  HomePage,
  MapaPage,
  TabsPage,
 } from '../pages/index.paginas';

// plugins 
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleMaps } from '@ionic-native/google-maps';
import { EmailComposer } from '@ionic-native/email-composer';
import { Contacts } from '@ionic-native/contacts';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// servicios
import { HistorialServices } from '../providers/historial.service';

@NgModule({
  declarations: [
    MyApp,
    HistorialPage,
    HomePage,
    MapaPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,    
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistorialPage,
    HomePage,
    MapaPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HistorialServices,
    InAppBrowser,
    GoogleMaps,
    Contacts,
    EmailComposer
  ]
})
export class AppModule {}
