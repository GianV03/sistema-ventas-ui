import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersMainComponent } from './pages/orders-main/orders-main.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    OrdersMainComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MaterialModule
  ]
})
export class OrdersModule { }
