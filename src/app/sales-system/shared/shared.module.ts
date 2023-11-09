import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainTableComponent } from './components/main-table/main-table.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    MainTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MainTableComponent
  ]
})
export class SharedModule { }
