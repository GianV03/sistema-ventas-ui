import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalesDetailsComponent } from '../sales-details/sales-details.component';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent implements OnInit{

  constructor(
    private dialogRef: MatDialog
  ){

  }

  ngOnInit(): void {
  }

  openPaymentDetail(){
    this.dialogRef.open(SalesDetailsComponent, {
      width: '600px',
    });
  }
  

}
