import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../_modelo/Producto';
import { ProductoServicioService } from '../_servicio/producto-servicio.service';

@Component({
  selector: 'app-alta-productos',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './alta-productos.component.html',
  styleUrl: './alta-productos.component.css'
})
export class AltaProductosComponent implements OnInit{

  form: FormGroup;
  id: number = 0;
  modificar: boolean = false;


  constructor(private ruta: ActivatedRoute, private router: Router, private servicio: ProductoServicioService){

    
    this.form = new FormGroup(
      {
        'idProducto': new FormControl(0),
        'nombreProducto' : new FormControl(""),
        'precioUnitario' : new FormControl(0),
        'unidadesStock' : new FormControl(0),
        'categoria' : new FormControl(0),

      }
    )
  }
  
  ngOnInit(): void {

    this.ruta.params
    .subscribe(
      data => {
        this.id = data['id']
        this.modificar = data['id'] != null
        this.crearFormulario()
      }
    )
    
  }

  crearFormulario(){
    if(this.modificar){
      this.servicio.obtenerPorId(this.id).
      subscribe(
        data=> {
          this.form = new FormGroup(
            {
              'idProducto': new FormControl(data.idProducto),
              'nombreProducto' : new FormControl(data.nombreProducto),
              'precioUnitario' : new FormControl(data.precioUnitario),
              'unidadesStock' : new FormControl(data.unidadesStock),
              'categoria' : new FormControl(data.categoria),
            }
          )
        }
      )
    }
  }

  operar(){
    let p: Producto = {
      'idProducto': this.form.value['idProducto'],
      'nombreProducto' : this.form.value['nombreProducto'],
      'precioUnitario' : this.form.value['precioUnitario'],
      'unidadesStock' : this.form.value['unidadesStock'],
      'categoria' : this.form.value['categoria'],
    }

    
    if(this.modificar){

      this.servicio.modificar(p)
      .subscribe(
        ()=> {
          this.servicio.obtenerTodos()
          .subscribe(
            data=> {
              this.servicio.productoCambio.next(data)
            }
          )
        }
      )
    }else{
      this.servicio.insert(p)
      .subscribe(
        ()=> this.servicio.obtenerTodos()
        .subscribe(data=> {
          this.servicio.productoCambio.next(data);
        })
      )
    }
    this.router.navigate(['']);
  }

  

}
