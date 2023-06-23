import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesMainComponent } from './pages/sales-main/sales-main.component';

const routes: Routes = [
  {
    path:'',
    component:SalesMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
