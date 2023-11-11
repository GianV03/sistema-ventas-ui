import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SalesDetailsComponent } from '../sales-details/sales-details.component';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/sales-system/shared/services/product.service';
import { ProductPage, ProductPageContent } from 'src/app/sales-system/shared/interfaces/product-page.interface';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent implements OnInit{

  public dataSource!: MatTableDataSource<ProductPageContent>;
  public discount: number= 0;
  public displayedColumns: string[] = ['nro', 'product', 'description', 'price', 'select'];
  public selectedProducts: ProductPageContent[]=[];
  public subtotal: number = 0;
  public total: number= 0;

  constructor(
    private dialogRef: MatDialog,
    private productService: ProductService
  ){

  }

  ngOnInit(): void {
  }

  onSearch(name : string){
    this.productService
    .findProductByName(name)
    .subscribe(
      response=>{
        this.dataSource = new MatTableDataSource(response.content);
      }
    )
  }

  toggleSelection(item: ProductPageContent){
    const index = this.selectedProducts.indexOf(item);
    if(index == -1){

      this.selectedProducts.push(item);

      this.subtotal+= item.salePrice;
      this.total = this.total+=item.salePrice;

    }else{

      this.subtotal-=item.salePrice;
      this.total = this.total-=item.salePrice;

      this.selectedProducts.splice(index, 1);
    }
    console.log(this.selectedProducts);
  }

  isSelected(item: any){
    return false;
  }

  openPaymentDetail(){
    this.dialogRef.open(SalesDetailsComponent, {
      width: '600px',
      data: {'total': this.total}
    });
  }


  

}
