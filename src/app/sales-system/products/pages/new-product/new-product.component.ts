import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { productData, products } from '../../interfaces/product.interface';

@Component({
  selector: 'products-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public id?:string | null;
  public mode?: string | null;
  public modeView: boolean = false;
  public product?: productData;
  public productForm!: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ){

  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    if(this.mode == 'view') this.modeView = true;
    this.initForm();
    this.initValues();
  }

  initValues(){

    if(this.id){
      this.product = products[Number(this.id)-1];
      this.getName().setValue(this.product.name);
      this.getType().setValue(this.product.type);
      this.getPurchasePrice().setValue(this.product.price);
    }

  }

  initForm(){
    this.productForm = this.formBuilder.group({
      name:[{value:'', disabled: this.modeView}],
      type:[{value:'', disabled: this.modeView}],
      purchasePrice:[{value:'', disabled: this.modeView}],
      salePrice:[{value:'', disabled: this.modeView}],
      supplier:[{value:'', disabled: this.modeView}],
      details:[{value:'', disabled: this.modeView}]
    })
  }

  getName(){
    return this.productForm.get('name')!;
  }

  getType(){
    return this.productForm.get('type')!;
  }

  getPurchasePrice(){
    return this.productForm.get('purchasePrice')!;
  }

  getSalePrice(){

  }

  getSupplier(){

  }

  getDetails(){

  }

}
