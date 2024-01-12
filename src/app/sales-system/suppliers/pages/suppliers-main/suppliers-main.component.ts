import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-suppliers-main',
  templateUrl: './suppliers-main.component.html',
  styleUrls: ['./suppliers-main.component.css']
})
export class SuppliersMainComponent implements AfterViewInit, OnInit {

  dataSource!:MatTableDataSource<any>;
  displayedColumns = ['nro', 'name', 'details', 'address', 'actions'];
  public pageIndex: number=0;
  public pageSize: number=2;
  public totalLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('productNameFilter', { static: false }) productNameFilter!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private supplierService: SupplierService
  ){}

  ngOnInit(): void {
    this.findSuppliers();
  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  findSuppliers(){
    this.supplierService.findSuppliers(this.paginator)
    .subscribe(
      response=>{
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;
      }
    )
  }


  findSuppliersByFilters(){
    this.supplierService.findSuppliersByFilters(this.productNameFilter.nativeElement.value, 
                                                this.paginator)
    .subscribe(
      response=>{
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;
      }
    );
  }
  
  viewSupplier(supplierId: string){
    this.router.navigate(['/proveedores/nuevo', {id: supplierId, mode: 'view'}]);
  }

  editSupplier(supplierId: string){
    this.router.navigate(['/proveedores/nuevo', {id: supplierId, mode: 'edit'}]);
  }

  deleteSupplier(supplierId: string){
    Swal.fire({
      title: "¿Está seguro de eliminar el registro?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.supplierService.deleteSupplier(supplierId)
        .subscribe(
          response=>{
            this.findSuppliersByFilters();
            Swal.fire("Se ha eliminado el registro", "", "success");
          },
          error=>{
            console.log(error)
            Swal.fire("No se ha podido eliminar el registro", "", "error");
          }
        )
      } else if (result.isDenied) {
      }
    });
  }

}
