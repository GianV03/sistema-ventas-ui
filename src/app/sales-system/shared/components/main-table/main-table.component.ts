import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input('displayedColumns') displayedColumns!: string[];
}
