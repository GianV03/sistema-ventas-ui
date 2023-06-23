import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./sales-system/sales-system.module').then(m=>m.SalesSystemModule),
  },
{
  path:'auth',
  loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
