import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit{

  orderForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.initValues();
    this.initForm();
  }

  initValues(){

  }

  initForm(){
    this.orderForm = new FormGroup({
        orderDate: new FormControl(''),
        deliveryDate: new FormControl(''),
        realDeliveryDate : new FormControl(''),
        supplier: new FormControl(''),
        state: new FormControl(),
        subtotal: new FormControl(0),
        total: new FormControl(0),
        orderDetails : new FormArray([])
    });

    this.addDetail();

  }

  get orderDetailsFormArray(){
    return this.orderForm.get('orderDetails') as FormArray;
  }

  addDetail(){
    const newDetail = this.formBuilder.group({
      product: ['product'],
      price: [0],
      quantity: [0],
      total:[0]
    });

    this.orderDetailsFormArray.push(newDetail);
  }

  removeDetail(index: number){
    this.orderDetailsFormArray.removeAt(index);
  }

  getFormGroup(index: number): FormGroup {
    return this.orderDetailsFormArray.at(index) as FormGroup;
  }

  findAllSuppliers(){
    
  }

}
