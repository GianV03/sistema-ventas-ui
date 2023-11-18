import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersMainComponent } from './pages/orders-main/orders-main.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';

const routes: Routes = [
  {
    path:'',
    component: OrdersMainComponent
  },
  {
    path:'nuevo',
    component: NewOrderComponent
  },
  {
    path:'editar',
    component: NewOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
