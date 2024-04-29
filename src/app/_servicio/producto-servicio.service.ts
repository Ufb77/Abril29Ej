import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Producto } from '../_modelo/Producto';
import { entorno } from '../_entorno/entorno';

@Injectable({
  providedIn: 'root'
})
export class ProductoServicioService {


  productoCambio = new Subject<Producto[]>();

  constructor(private direccion: HttpClient ) {

    
   }

   obtenerTodos():Observable<Producto[]>{
      return this.direccion.get<Producto[]>(entorno.HOST);
   }

   obtenerPorId(id: number){

    return this.direccion.get<Producto>(entorno.HOST + "/" +id)
   }

   insert(p: Producto): Observable<Producto>{

    return this.direccion.post<Producto>(entorno.HOST, p);
   }

   eliminar(id: number){
    return this.direccion.delete(entorno.HOST + "/" +id);
   }

   modificar(p: Producto){
    return this.direccion.put(entorno.HOST, p);
   }
}
