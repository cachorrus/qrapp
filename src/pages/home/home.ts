import { Component } from '@angular/core';

import { ToastController, Platform } from 'ionic-angular';

// plugins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// interface
import { iBarcode } from '../../interfaces/barcode.interface';

// servicios
import { HistorialServices } from '../../providers/historial.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private platform: Platform,
    private _historialService: HistorialServices) {

  }

  scan() { 

    if (!this.platform.is('cordova')) {
        this._historialService.agregar_Historial( `BEGIN:VCARD
  VERSION:2.1
  N:Kent;Clark
  FN:Clark Kent
  ORG:
  TEL;HOME;VOICE:12345
  TEL;TYPE=cell:67890
  ADR;TYPE=work:;;;
  EMAIL:clark@superman.com
  END:VCARD` );
      return;
    }


    this.barcodeScanner.scan().then( (barcodeData:iBarcode) => {
      console.log('Barcode data', JSON.stringify(barcodeData));

      if( !barcodeData.cancelled) {
        this._historialService.agregar_Historial( barcodeData.text );
      }     

     }).catch(err => {
         console.log('Error', err);
         this.mostrarError( 'Error: ' + err );
     });
  }

  mostrarError( mensaje:string ) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });

    toast.present();
  }

}
