import { Component } from '@angular/core';

@Component({
  selector: 'sales-system-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
public sidebarItems = [
  {label:'ventas', icon:'store', url:'./ventas'},
  {label:'Productos', icon:'inventory_2', url:'./productos'},
  {label:'Inventario', icon:'inventory', url:'./inventario'},
  {label:'Proveedores', icon:'local_shipping', url:'./proveedores'},
  {label:'Pedidos', icon:'mail', url:'./pedidos'},  
  {label: 'registros', icon:'library_books', url:'/'},
  {label: 'configuraciones', icon:'settings', url:''}
]
}
