import { Injectable } from '@angular/core';
import { ScanData } from '../models/scan-data.model';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { iBarcode } from '../interfaces/barcode.interface';
import { MapaPage } from '../pages/mapa/mapa';
// import { ModalController, NavController, App } from 'ionic-angular';
import { App, Platform, ToastController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class HistorialServices {

  private historial:ScanData[] = [];

  constructor(
    private iab: InAppBrowser,
    // private modalCtrl: ModalController,
    // private navCtrl: NavController,
    public app: App,
    private contacts: Contacts,
    private platform: Platform,
    private toastCtrl: ToastController,
    private emailComposer: EmailComposer
  ) {
    console.log('Hello HistorialProvider Provider');
  }

  agregar_Historial( scan:string ) {

    console.log(scan);

    let data = new ScanData(scan);

    data.info = scan;

    this.historial.unshift(data); // agregar al inicio de la lista
    
    this.abrirScan(0);

  }

  abrirScan(index:number) {

    let scanData:ScanData = this.historial[index];
    console.log(JSON.stringify(scanData));

    switch (scanData.tipo) {
      case 'http':

        this.iab.create(scanData.info,'_system');
        break;

      case 'mapa':
          // "@ionic-native/google-maps": "^4.8.2 no funciona el modal ya que abre una ventana transparente"
          // https://github.com/ionic-team/ionic/issues/8761
          // https://forum.ionicframework.com/t/native-google-maps-not-working-inside-a-modal/89171/10
          // this.modalCtrl.create(MapaPage, { coords: scanData.info }).present();       

          // no funciona NavController desde un provider/servicio
          // https://github.com/ionic-team/ionic/issues/9581
          // this.app.getActiveNav().setRoot(TabsPage);
          // this.navCtrl.push(MapaPage,{ coords: scanData.info },{animate:false});
          
          this.app.getRootNav().push(MapaPage, { coords: scanData.info });
          
        break;

      case 'contacto':

          this.leerVcard( scanData.info );

        break;
      
      case 'email':
        this.enviarEmail(scanData.info);
        break;
      default:
        console.error('tipo no soportado');
        break;
    }

  }

  private enviarEmail( texto:string ) {
    
    let emailParse = this.parseEmail( texto );

    this.emailComposer.isAvailable().then((available: boolean) =>{
      let email = {
        to: emailParse.to,            
        subject: emailParse.subject,
        body: emailParse.body,
        isHtml: true
      };
    
      // Send a text message using default options
      this.emailComposer.open(email);
     }, (error: any) => this.showToast(`El usuario no parece tener cuenta de correo en el dispositivo. ${error}`));
    
    

  }

  private parseEmail( texto: string) {

    let emailParsed = {};

    let emailParts = texto.slice(7).split(';'); // quitar MATMSG:

    let to:string = emailParts[0].split(':')[1];
    let subject:string = emailParts[1].split(':')[1];
    let body:string = emailParts[2].split(':')[1];
    
    return { to, subject, body };
  }

  private leerVcard( texto:string ) {

    let campos:any = this.parseVcard( texto );

    console.log(JSON.stringify(campos));

    if (!this.platform.is('cordova')) {
      console.warn('No estas en un dispositivo');
      return;
    }

    let nombre = campos.fn // campos.['fn']
    let tipoTel = campos.tel[0].meta.TYPE;
    let tel = campos.tel[0].value[0];

    let contact: Contact = this.contacts.create();

    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField(tipoTel, tel)];
    contact.save().then(
      () => this.showToast(`Contacto ${nombre} creado`),
      (error: any) => this.showToast(`Error guardando el contacto. ${error}`) //  console.error('Error saving contact.', error)
    );

  }

  private showToast( mensaje:string ) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }

  private parseVcard( input:string ) {

    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};

    input.split(/\r\n|\r|\n/).forEach(function (line) {
        var results, key;

        if (Re1.test(line)) {
            results = line.match(Re1);
            key = results[1].toLowerCase();
            fields[key] = results[2];
        } else if (Re2.test(line)) {
            results = line.match(Re2);
            key = results[1].replace(ReKey, '').toLowerCase();

            var meta = {};
            results[2].split(';')
                .map(function (p, i) {
                var match = p.match(/([a-z]+)=(.*)/i);
                if (match) {
                    return [match[1], match[2]];
                } else {
                    return ["TYPE" + (i === 0 ? "" : i), p];
                }
            })
                .forEach(function (p) {
                meta[p[0]] = p[1];
            });

            if (!fields[key]) fields[key] = [];

            fields[key].push({
                meta: meta,
                value: results[3].split(';')
            })
        }
    });

    return fields;
  };

  cargarHistorial() {
    return this.historial;
  }

}
