import { Component } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { DataService, Receta } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  

  receta:Receta[] = [];

  constructor(private dataService:DataService,private alertCtrl: AlertController, private modalCtrl:ModalController,private platform:Platform) {

    //OBTENER RECETAS CUYO TIPO SEA MERIENDA
    this.dataService.getRecetas().subscribe(res => {
      console.log(res);
      this.receta = res.filter(item => item.tipo === 'merienda');
    });
  }

  //ESTA FUNCION SE EJECUTA CUANDO SE ABRE LA PAGINA
  ionViewDidEnter() {

    //BOTON ATRAS
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Botón Atrás presionado!');
      window.close();
    });
  }

    //ABRIR RECETA
  async openReceta(receta:Receta){
    //ABRIR MODAL
    const modal = await this.modalCtrl.create({
      component:ModalPage,
      componentProps : {
        id:receta.id
      },
      initialBreakpoint: 0.95,
       cssClass: 'modal-fullscreen',
       backdropDismiss: true


    });
    modal.present();
  }

  //AÑADIR RECETA
  async addReceta(){

    //CONFIGURACION DE ALERTA
    const alert = await this.alertCtrl.create({
      header: 'Nueva receta',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        },
        {
          name: 'descripcion',
          type: 'textarea',
          placeholder: 'Descripción'
        },
        {
          name: 'ingredientes',
          type:'text',
          placeholder: 'Ingredientes'
        },
        {
          name: 'elaboracion',
          type: 'text',
          placeholder: 'Preparación'
        },
        {
          name: 'autor', 
          type: 'text',
          placeholder: 'Su nombre...'
        }
      ],
      //BOTONES DE ALERTA
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Crear',
          handler: (data) => {
            console.log(data);

            //AÑADIR RECETA
            this.dataService.addReceta({
              titulo: data.titulo,
              descripcion: data.descripcion,
              ingredientes: data.ingredientes,
              elaboracion: data.elaboracion,
              autor: data.autor,
              tipo: 'merienda'
            });
          }
        }
      ]
    });

    //MOSTRAR ALERTA
    await alert.present();
  }

}
