import { Component } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { DataService, Receta } from '../services/data.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  receta:Receta[] = [];

  constructor(private dataService:DataService,private alertCtrl: AlertController, private modalCtrl:ModalController,private platform:Platform ) {
    
    //OBTENER RECETAS CUYO TIPO SEA COMIDA
    this.dataService.getRecetas().subscribe(res => {
      console.log(res);
      this.receta = res.filter(item => item.tipo === 'comida');
    });
  }

  //ESTA FUNCION SE EJECUTA CUANDO SE ABRE LA PAGINA
  ionViewDidEnter() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Botón Atrás presionado!');
      window.close();
    });
  }


  //ABRIR RECETA
  async openReceta(receta:Receta){
    const modal = await this.modalCtrl.create({
      component:ModalPage,
      componentProps : {
        id:receta.id
      },
      cssClass: 'modal-css'
    });
    modal.present();
  }

  //AÑADIR RECETA
  async addReceta(){
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
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Crear',
          handler: (data) => {
            console.log(data);
            this.dataService.addReceta({
              titulo: data.titulo,
              descripcion: data.descripcion,
              ingredientes: data.ingredientes,
              elaboracion: data.elaboracion,
              autor: data.autor,
              tipo: 'comida'
            });
          }
        }
      ]
    });
    await alert.present();
  }     
}
