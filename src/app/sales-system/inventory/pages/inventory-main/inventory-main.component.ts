import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from 'src/app/sales-system/shared/interfaces/inventory.interface';
import { InventoryService } from 'src/app/sales-system/shared/services/inventory.service';
import { ProductTypesService } from 'src/app/sales-system/shared/services/product-types.service';


export interface productData {
  id: string;
  name: string;
  type: string;
  stock: number;
  state: string;
}


@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'product', 'supplier', 'stock', 'state', 'actions'];
  public dataSource!: MatTableDataSource<Inventory>;
  public filtersForm!: FormGroup;
  public pageIndex: number=0;
  public pageSize: number=10;
  public productTypes!: any;
  public totalLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private productTypesService: ProductTypesService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initValues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initValues(){
    this.findAllProductTypes();
    this.findAllInventory();
  }

  initForm(){
    this.filtersForm = this.formBuilder.group({
      product: [],
       type: []
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllInventory(){

    if(this.paginator) this.pageIndex = this.paginator.pageIndex;

    this.inventoryService.findAllInventory(this.pageIndex, this.pageSize)
    .subscribe(
      response=>{
        this.dataSource = new MatTableDataSource(response.content);
        console.log(response)
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;

      }
    )
  }

  findAllProductTypes(){
    this.productTypesService.findAllProductTypes()
    .subscribe(
      response=>{
        console.log(response)
        this.productTypes = response;
      }
    )
  }


  findInventoryByFilters(newSearch: boolean){
    this.inventoryService.findInventoryByFilters(this.getProductName(), this.getProductType(),
      this.paginator
    )
    .subscribe(
      response=>{
        console.log(response)
        this.dataSource = new MatTableDataSource(response.content);
        this.pageIndex = response.number;
        this.pageSize = response.size;
        this.totalLength = response.totalElements;
      }
    )
  }

  getProductName(){
    return this.filtersForm.get('product')!.value;
  }

  getProductType(){
    return this.filtersForm.get('type')!.value;
  }

}
