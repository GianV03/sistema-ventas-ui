import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout-page/layout-page.component';

const routes: Routes = [
{
    path:'',
    component: LayoutPageComponent,
    children:[
        {path:'ventas', loadChildren:()=>import('./sales/sales.module').then(m=>m.SalesModule)},
        {path:'productos', loadChildren:()=>import('./products/products.module').then(m=>m.ProductsModule)},
        {path:'inventario', loadChildren:()=>import('./inventory/inventory.module').then(m=>m.InventoryModule)},
        {path:'proveedores', loadChildren:()=>import('./suppliers/suppliers.module').then(m=>m.SuppliersModule)},
        {path:'pedidos', loadChildren:()=>import('./orders/orders.module').then(m=>m.OrdersModule)},
        {path:'', redirectTo: 'productos', pathMatch:'full'},
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesSystemRoutingModule { }
