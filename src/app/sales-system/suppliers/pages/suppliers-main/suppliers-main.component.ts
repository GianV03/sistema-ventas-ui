import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';


@Component({
  selector: 'app-suppliers-main',
  templateUrl: './suppliers-main.component.html',
  styleUrls: ['./suppliers-main.component.css']
})
export class SuppliersMainComponent implements OnInit {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['nro', 'name', 'details', 'address', 'actions'];
  public pageIndex?: number;
  public pageSize?: number;
  public totalLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ){}

  ngOnInit(): void {
    this.findSuppliers();
  }

  findSuppliers(event?: PageEvent){
    this.supplierService.findSuppliers(event!)
    .subscribe(
      response=>{
        console.log(response)
        this.dataSource = new MatTableDataSource(response.content);
        console.log(response.content)
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;
      }
    )
  }

  
  viewSupplier(productId: string){
    this.router.navigate(['/proveedores/nuevo', {id: productId, mode: 'view'}]);
  }

  editSupplier(productId: string){
    this.router.navigate(['/proveedores/nuevo', {id: productId, mode: 'edit'}]);
  }

}
