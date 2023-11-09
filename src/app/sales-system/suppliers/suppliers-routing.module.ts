import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersMainComponent } from './pages/suppliers-main/suppliers-main.component';
import { NewSupplierComponent } from './pages/new-supplier/new-supplier.component';

const routes: Routes = [
  {
    path:'',
    component: SuppliersMainComponent
  },
  {
    path: 'nuevo',
    component: NewSupplierComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
