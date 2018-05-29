export class ScanData {
    info:string;
    tipo: string;

    constructor(tipoArchivo: string) {
        this.tipo = 'no_definido';

        if(tipoArchivo.startsWith('http')) {
            this.tipo = 'http';
        }else if(tipoArchivo.startsWith('geo')) {
            this.tipo = 'mapa';
        }else if(tipoArchivo.startsWith('BEGIN:VCARD')) {
            this.tipo = 'contacto';
        }else if(tipoArchivo.startsWith('MATMSG')) {
            this.tipo = 'email';
        }
    }
}
