import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitesService {

  constructor() { }

  //METODO PARA OBTENER LA HORA ACTUAL

  obtenerHoraActual(): string {
    const fecha = new Date();
    const hora = fecha.getHours();
    const minuto = fecha.getMinutes();
    const segundo = fecha.getSeconds();
    return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
  }
  
}
