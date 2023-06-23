import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
export class InventoryMainComponent {
  displayedColumns: string[] = ['id', 'name', 'type', 'stock', 'state', 'actions'];
  dataSource: MatTableDataSource<productData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    let product1 ={
      id: '1',
      name: 'CocaCola',
      type: 'bebida gaseosa',
      stock: 240,
      state: 'disponible'
    }

    let product2 ={
      id: '2',
      name: 'Sublime',
      type: 'Chocolate',
      stock: 400,
      state: 'disponible'
    }
    this.dataSource = new MatTableDataSource([product1, product2]);
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
}
