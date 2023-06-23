import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { productData, products } from '../../interfaces/product.interface';
import { Router } from '@angular/router';





@Component({
  selector: 'products-main-products-page',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent {
  displayedColumns: string[] = ['id', 'name', 'type', 'price', 'actions'];
  dataSource: MatTableDataSource<productData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router
  ) {

    this.dataSource = new MatTableDataSource(products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewProduct(productId: string){
    this.router.navigate(['/productos/nuevo', {id: productId, mode: 'view'}]);
  }

  editProduct(productId: string){
    this.router.navigate(['/productos/nuevo', {id: productId, mode: 'edit'}]);
  }
}


