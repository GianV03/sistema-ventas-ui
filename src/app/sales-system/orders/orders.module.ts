import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersMainComponent } from './pages/orders-main/orders-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOrderComponent } from './pages/new-order/new-order.component';


@NgModule({
  declarations: [
    OrdersMainComponent,
    NewOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
