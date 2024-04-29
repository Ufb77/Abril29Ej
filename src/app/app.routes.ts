import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { AltaProductosComponent } from './alta-productos/alta-productos.component';

export const routes: Routes = [
    {path: '', component: ListaProductosComponent , children:
[
    {path: 'alta', component: AltaProductosComponent},
    {path: 'modificar/:id', component: AltaProductosComponent}
]
}
];
