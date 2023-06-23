import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesMainComponent } from './pages/sales-main/sales-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SalesDetailsComponent } from './pages/sales-details/sales-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SalesMainComponent,
    SalesDetailsComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SalesModule { }
