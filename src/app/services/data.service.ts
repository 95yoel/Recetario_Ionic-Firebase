import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Receta {
  id?: string;
  autor:string;
  titulo: string;
  descripcion: string;
  ingredientes: string[];
  elaboracion: string[];
  tipo: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private firestore:Firestore) { }

  //OBTENER RECETAS
  getRecetas():Observable<Receta[]>{
    const RecetasReference = collection(this.firestore, 'recetas');
    return collectionData(RecetasReference, {idField: 'id'}) as Observable<Receta[]>;
  }

  //OBTENER RECETA POR ID
  getRecetasById(id:string):Observable<Receta>{
    const RecetaDocReference = doc(this.firestore, `recetas/${id}`);
    return docData(RecetaDocReference, {idField:'id'}) as Observable<Receta>;
  }

  //AÑADIR RECETA
  addReceta(receta:Receta){
    const RecetasReference = collection(this.firestore, 'recetas');
    return addDoc(RecetasReference, receta);
  }

  //ELIMINAR RECETA
  deleteReceta(receta:Receta){
    const RecetaDocReference = doc(this.firestore, `recetas/${receta.id}`);
    return deleteDoc(RecetaDocReference);
  }

  //ACTUALIZAR RECETA
  updateReceta(receta:Receta){
    const RecetaDocReference = doc(this.firestore, `recetas/${receta.id}`);
    return updateDoc(RecetaDocReference, {autor:receta.autor, titulo:receta.titulo, descripcion:receta.descripcion, ingredientes:receta.ingredientes, elaboracion:receta.elaboracion, tipo:receta.tipo});
  }



}
