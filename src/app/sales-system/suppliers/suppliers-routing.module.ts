import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersMainComponent } from './pages/suppliers-main/suppliers-main.component';

const routes: Routes = [
  {
    path:'',
    component: SuppliersMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
