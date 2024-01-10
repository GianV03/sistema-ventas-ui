import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryMainComponent } from './pages/inventory-main/inventory-main.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    InventoryMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InventoryModule { }
