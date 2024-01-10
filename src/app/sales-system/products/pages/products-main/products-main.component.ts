import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/sales-system/shared/services/product.service';
import { ProductPageContent, ProductPage } from 'src/app/sales-system/shared/interfaces/product-page.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductTypesService } from 'src/app/sales-system/shared/services/product-types.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'products-main-products-page',
  templateUrl: './products-main.component.html',
  styleUrls: ['./products-main.component.css']
})
export class ProductsMainComponent implements AfterViewInit, OnInit {
  public count: number = 0;
  public displayedColumns: string[] = ['nro', 'name', 'typeName', 'price', 'actions'];
  public dataSource!: MatTableDataSource<ProductPageContent>;
  public filtersForm!: FormGroup;
  public pageIndex: number=0;
  public pageSize: number=5;
  public productsTypes!: any;
  public totalLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productTypesService: ProductTypesService,
    private router: Router
  ) {

  }
  ngOnInit(): void {

    this.initValues();

  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  /** Se inicializan valores */
  initValues(){

    this.findProductTypes();
    this.productsInitialSearch();
    this.initForm();

  }

  initForm(){

    this.filtersForm = this.formBuilder.group({
      name: ['', []],
      type: ['', []]
    })

  }

  /** Búsqueda inicial de productos */
  productsInitialSearch(){

    this.productService.findProductsByFilter('', '', 0, 5)
    .subscribe(
      (response: ProductPage)=>{
        console.log(response)
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;
      }
    )

  }

  /** Búsqueda de productos por filtros */
  findProducts(newSearch: boolean){

    // Se valida si se realiza una nueva búsqueda o se cambia de página
    if(newSearch == true){
      this.pageIndex = 0
    }else{
      this.pageIndex = this.paginator?.pageIndex
    }

    this.pageSize = this.paginator?.pageSize
    
    this.productService.findProductsByFilter(
      this.getProductNameFilter().toString(), this.getProductTypeFilter().toString(), 
      this.pageIndex, this.pageSize
    )
    .subscribe(
      response =>{
        console.log(response)
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.pageable.pageNumber;
        this.pageSize = response.pageable.pageSize;
        this.totalLength = response.totalElements;
      }
    )

  }

  getNameFilter(): any {

    throw new Error('Method not implemented.');

  }

  /** Aplicar  */              /** Verificar uso de este método */
  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  findProductTypes(){

    this.productTypesService.findAllProductTypes()
    .subscribe(
      response =>{
        this.productsTypes = response;
        console.log(response)
      }
    )

  }

  viewProduct(productId: string){
    this.router.navigate(['/productos/nuevo', {id: productId, mode: 'view'}]);
  }

  editProduct(productId: string){
    this.router.navigate(['/productos/editar', {id: productId, mode: 'edit'}]);
  }

  deleteProduct(productId: string){
    Swal.fire({
      title: "¿Está seguro de eliminar el registro?",
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId)
        .subscribe(
          response=>{
            this.findProducts(false);
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

  getProductNameFilter(){
    return this.filtersForm.get('name')!.value;
  }

  getProductTypeFilter(){
    return this.filtersForm.get('type')!.value;
  }

}


