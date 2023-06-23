import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesSystemRoutingModule } from './sales-system-routing.module';
import { MainTableComponent } from './shared/components/main-table/main-table.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SalesSystemRoutingModule,
    MaterialModule
  ]
})
export class SalesSystemModule { }
