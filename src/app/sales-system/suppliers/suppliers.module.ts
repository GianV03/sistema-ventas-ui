import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersMainComponent } from './pages/suppliers-main/suppliers-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';


@NgModule({
  declarations: [
    SuppliersMainComponent,
    NewSupplierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SuppliersRoutingModule,
    ReactiveFormsModule
  ]
})
export class SuppliersModule { }
