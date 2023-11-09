import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Inventory } from 'src/app/sales-system/shared/interfaces/inventory.interface';
import { InventoryService } from 'src/app/sales-system/shared/services/inventory.service';

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
  displayedColumns: string[] = ['id', 'product', 'type', 'stock', 'state', 'actions'];
  dataSource!: MatTableDataSource<Inventory>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private inventoryService: InventoryService
  ) {
  }
  ngOnInit(): void {
    this.initValues();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initValues(){
    this.findAllInventory();
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllInventory(){
    this.inventoryService.findAllInventory()
    .subscribe(
      response=>{
        this.dataSource = new MatTableDataSource(response.content);
        console.log(response);
      }
    )
  }

}
