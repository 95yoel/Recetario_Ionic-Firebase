import { Component, OnInit } from '@angular/core';
import { UtilitesService } from '../services/utilites.service';

@Component({
  selector: 'app-hora',
  templateUrl: './hora.component.html',
  styleUrls: ['./hora.component.scss'],
})
export class HoraComponent  implements OnInit {
  
  horaActual: string | undefined;
  constructor(private UtilitesService:UtilitesService) {

    //OBTENER HORA ACTUAL A TRAVES DEL SERVICIO UTILITES Y ACTUALIZAR CADA SEGUNDO
    setInterval(() => {
      this.horaActual = this.UtilitesService.obtenerHoraActual();
    }, 1000);
    
   }

  ngOnInit() {}

}




