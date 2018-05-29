import { Component } from '@angular/core';
import { HistorialServices } from '../../providers/historial.service';
import { ScanData } from '../../models/scan-data.model';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  historial:ScanData[] = [];

  constructor(private _historialService: HistorialServices) {
  }

  ionViewDidLoad() {
    this.historial = this._historialService.cargarHistorial();
  }

  abrirScan( index:number) {
    this._historialService.abrirScan(index);
  }

}
