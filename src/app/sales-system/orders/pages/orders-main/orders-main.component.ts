import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders-main',
  templateUrl: './orders-main.component.html',
  styleUrls: ['./orders-main.component.css']
})
export class OrdersMainComponent {

  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nro', 'date', 'supplier', 'product', 'status', 'subtotal', 'total', 'actions'];
  public pageIndex: number = 0;
  public totalLength: number = 0;
  public pageSize: number = 5;



  applyFilter(f:any){

  }


  findProducts(f:any){

  }

  viewProduct(id: string){

  }

  editProduct(id: string){
    
  }

}
