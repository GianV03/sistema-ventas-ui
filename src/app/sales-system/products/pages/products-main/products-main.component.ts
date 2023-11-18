import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/sales-system/shared/services/product.service';
import { ProductPageContent, ProductPage } from 'src/app/sales-system/shared/interfaces/product-page.interface';



@Component({
  selector: 'products-main-products-page',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements AfterViewInit, OnInit {
  count: number = 0;
  displayedColumns: string[] = ['nro', 'name', 'typeName', 'price', 'actions'];
  dataSource!: MatTableDataSource<ProductPageContent>;
  public pageIndex?: number;
  public pageSize?: number;
  public totalLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.initValues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.productService.findAllProducts().subscribe(response=>{console.log(response)});
  }

  initValues(){
    this.findProducts();
  }

  findProducts(event?: PageEvent){
    this.productService.findAllProducts(event!)
    .subscribe(
      (response: ProductPage)=>{
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;

      }
    )
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
    this.router.navigate(['/productos/editar', {id: productId, mode: 'edit'}]);
  }
}


