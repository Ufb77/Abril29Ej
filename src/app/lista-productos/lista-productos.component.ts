import { Component, OnInit } from '@angular/core';
import { Producto } from '../_modelo/Producto';
import { ProductoServicioService } from '../_servicio/producto-servicio.service';
import { AltaProductosComponent } from '../alta-productos/alta-productos.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [ RouterModule, AltaProductosComponent],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {

  constructor(private servicio: ProductoServicioService){}

  productos: Producto[] = [];



  ngOnInit(): void {
    this.servicio.productoCambio.subscribe(
      (data)=> {this.productos = data}
    )

    this.servicio.obtenerTodos().
    subscribe(
      (obtenido => {this.productos = obtenido})
    )
  }

  eliminar(id: number){
    this.servicio.eliminar(id)
    .subscribe(
      ()=> {
        this.servicio.obtenerTodos().subscribe(data => this.servicio.productoCambio.next(data))
      }
    )
  }
}