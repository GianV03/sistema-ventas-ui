
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns';
import { OrderService } from 'src/app/sales-system/shared/services/order.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit{

  id?: string;
  mode?: string | null;
  modeView: boolean = false;
  order: any;
  orderForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private orderService: OrderService
  ){

  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    
    this.initForm();
    this.initValues();
  }

  initValues(){

    if(this.id && this.id!=''){
      this.orderService.findOrderById(this.id)
      .subscribe(
        response=>{
          const date = new Date(response.orderDate);
          this.orderForm.get('orderDate')!.setValue(format(date, 'dd/MM/yyyy'));

          this.order = response
        }
      )

    }else{

    }
    
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

  getOrderDate(){
    return this.orderForm.get('orderDate')!;
  }

}
