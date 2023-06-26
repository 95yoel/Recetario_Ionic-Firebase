import { Component, Input, OnInit } from '@angular/core';
import { DataService, Receta } from '../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input()
  id!: string;

  //DECLARACION DE OBJETO RECETA
  receta :Receta = {titulo: '',autor: '',descripcion: '',elaboracion: [],ingredientes: [],tipo: 'comida'};
  note: any;
  constructor(private dataService:DataService,private modalCtrl:ModalController, private toastCtrl: ToastController) { }

  ngOnInit() {


    //OBTENER RECETA POR ID AL INICIAR LA PAGINA
    this.dataService.getRecetasById(this.id).subscribe(res => {
      console.log(res);
      this.receta = res;
    });

    console.log(this.receta);
  }

  //ACTUALIZAR RECETA
  async updateReceta(){
    this.dataService.updateReceta(this.receta);
    const toast = await this.toastCtrl.create({
      message: 'Note updated',
      duration: 1000
    });
    toast.present();
    this.modalCtrl.dismiss();
  }

  //BORRAR RECETA
  async deleteReceta(){
    this.dataService.deleteReceta(this.receta);
    this.modalCtrl.dismiss();
  }
}
