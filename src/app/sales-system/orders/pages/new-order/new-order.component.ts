
import { provideCloudflareLoader } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { timeout } from 'rxjs';
import { ProductPage, ProductPageContent } from 'src/app/sales-system/shared/interfaces/product-page.interface';
import { productData } from 'src/app/sales-system/shared/interfaces/product.interface';
import { Supplier } from 'src/app/sales-system/shared/interfaces/supplier.interface';
import { OrderDetailService } from 'src/app/sales-system/shared/services/order-detail.service';
import { OrderService } from 'src/app/sales-system/shared/services/order.service';
import { ProductService } from 'src/app/sales-system/shared/services/product.service';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit{

  addDetailButtonDisabled:boolean = true;
  details?: any[];
  id?: string;
  mode?: string | null;
  modeView: boolean = false;
  order: any;
  orderForm!: FormGroup;
  products!: ProductPageContent[];
  selectedProducts: string[] = [''];
  suppliers!: Supplier[]


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService,
    private supplierService: SupplierService
  ){

  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    
    this.initForm();
    this.initValues();

  }

  initValues(){
    this.findAllSuppliers();
    this.findAllOrderDetails();
    if(this.id && this.id!=''){
      this.orderService.findOrderById(this.id)
      .subscribe(
        response=>{
          const date = new Date(response.orderDate);
          this.orderForm.get('orderDate')!.setValue(format(date, 'dd/MM/yyyy'));
          this.getSupplier().setValue(response.supplierId);
          this.getState().setValue(response.state);
          this.getSubtotal().setValue(response.subtotal);
          this.getTotal().setValue(response.total);
          this.order = response
        }
      )

    }else{

    }
    
  }

  initForm(){
    this.orderForm = new FormGroup({
        orderDate: new FormControl(''),
        orderDeliveryDate: new FormControl(''),
        orderRealDeliveryDate : new FormControl(''),
        supplier: new FormControl(''),
        state: new FormControl(),
        subtotal: new FormControl({value: 0,disabled: true}),
        total: new FormControl({value: 0, disabled: true}),
        orderDetails : new FormArray([])
    });

  }

  onSupplierSelectionChange(){

    this.addDetailButtonDisabled = false;
    this.findProductsBySupplier();

  }

  get orderDetailsFormArray(){
    return this.orderForm.get('orderDetails') as FormArray;
  }


  calculateDetailTotal(elemento: FormGroup){
    const quantity = elemento.get('quantity')?.value;
    const price = elemento.get('price')?.value;
    const total = quantity * price;
    elemento.get('total')?.setValue(total);
  }

  addDetail(product: string, price: number, quantity: number, total: number){

    let newDetail = this.formBuilder.group({
      product: [product],
      price: [{value:price, disabled: true}],
      quantity: [quantity],
      total:[{value:total, disabled: true}]
    });
    this.orderDetailsFormArray.push(newDetail);

  }

  removeDetail(index: number){
    this.orderDetailsFormArray.removeAt(index);
  }

  getFormGroup(index: number): FormGroup {
    return this.orderDetailsFormArray.at(index) as FormGroup;
  }

  // Bring all the order details by the order Id 
  findAllOrderDetails(){
    this.orderDetailService.findAllOrderDetailsByOrderId(this.id||'')
    .subscribe(
      response=>{
        this.details = response;
        this.details?.forEach(detail=>{
          this.addDetail(detail.productId, detail.price, detail.quantity, detail.total)
        })
      }
    )
  }

  // Brings all the suppliers for the mat-select
  findAllSuppliers(){
    this.supplierService.findAllSuppliers()
    .subscribe(
      response=>{
        this.suppliers = response
      }
    )
  }

  // Brings all the products for the mat-select
  findProductsBySupplier(){
    this.productService.findProductsBySupplier(this.getSupplier().value)
    .subscribe(
      response=>{
        this.products = response;
      }
    )
  }

  onSelectProduct(i: number){
    const productId = this.selectedProducts[i];
    const product = this.products.find(product => product.id == productId);
    this.getFormGroup(i).get('price')?.setValue(product?.purchasePrice);
  }

  onQuantityChanges(i: number){
    const price = this.getFormGroup(i).get('price')?.value;
    const quantity = this.getFormGroup(i).get('quantity')?.value;
    this.getFormGroup(i).get('total')?.setValue(quantity*price);
  }

  saveOrder(){
    if(this.id!==''){

    }else{

      const objectToSave ={
        orderDate : this.getOrderDate().value,
        orderDeliveryDate: this.getOrderDeliveryDate().value,
        orderRealDeliveryDate: this.getOrderRealDeliveryDate().value,
        supplier: this.getSupplier().value,
        state: this.getState().value
      }

      this.orderService
      .createOrder(objectToSave)
      .subscribe(response=>{
        console.log(response)
      })

    }
  }


  /** Getters for the Form Controls **/

  getOrderDate(){
    return this.orderForm.get('orderDate')!;
  }

  getOrderDeliveryDate(){
    return this.orderForm.get('orderDeliveryDate')!;
  }

  getOrderRealDeliveryDate(){
    return this.orderForm.get('orderRealDeliveryDate')!;
  }

  getSupplier(){
    return this.orderForm.get('supplier')!;
  }

  getState(){
    return this.orderForm.get('state')!;
  }

  getSubtotal(){
    return this.orderForm.get('subtotal')!;
  }

  getTotal(){
    return this.orderForm.get('total')!;
  }

}
