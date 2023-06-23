import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryMainComponent } from './pages/inventory-main/inventory-main.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    InventoryMainComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class InventoryModule { }
