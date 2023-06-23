import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsMainComponent } from './pages/products-main/products-main.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsMainComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
