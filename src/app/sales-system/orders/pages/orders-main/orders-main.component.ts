import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/sales-system/shared/services/order.service';

@Component({
  selector: 'app-orders-main',
  templateUrl: './orders-main.component.html',
  styleUrls: ['./orders-main.component.css']
})
export class OrdersMainComponent implements OnInit{


  public dataSource!: MatTableDataSource<any>;
  public displayedColumns: string[] = ['nro', 'date', 'supplier', 'status', 'subtotal', 'total', 'actions'];
  public pageIndex: number = 0;
  public totalLength: number = 0;
  public orders: any;
  public pageSize: number = 5;

  constructor(
    private orderService: OrderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.findAllOrders();
  }

  applyFilter(f:any){

  }


  findAllOrders(){
    this.orderService.findAllOrders()
    .subscribe(
      response=>{
        this.dataSource = response.content
      }
    )
  }

  viewOrder(id: string){

  }

  editOrder(id: string){
    this.router.navigate(['/pedidos/editar', {id: id, mode: 'edit'}])
  }

}
