import { Component} from '@angular/core';
import { Platform, ViewController, NavParams } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapOptions, Marker } from '@ionic-native/google-maps';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  map: GoogleMap;
  lat: number;
  lng: number;
  mapReady: boolean = false;

  constructor(
    public platform: Platform,
    private viewCtrl: ViewController,
    private navParams: NavParams
  ) {

    // this.lat = 21.46396529999999;
    // this.lng = -104.80068929999999;

    let coordsArray:Array<string> = this.navParams.get('coords').split(',');

    this.lat = Number( coordsArray[0].replace('geo:','') );
    this.lng = Number( coordsArray[1] );

    console.log('coords:', JSON.stringify(this.navParams.get('coords')));
    console.log(this.lat, this.lng);

    platform.ready().then(() => {
      console.log('platform ready');
      this.loadMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');      
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: this.lat,
           lng: this.lng
         },
         zoom: 16,
         tilt: 30
       }
     };

    // Create a map after the view is ready and the native platform is ready.
    this.map = GoogleMaps.create('mapCanvas', mapOptions);


    let marker: Marker = this.map.addMarkerSync({
      title: '@ionic-native/google-maps',
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
    
    marker.showInfoWindow();

    /*this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.mapReady = true;
      console.log('map is ready...');
    });*/
    
  }

  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
