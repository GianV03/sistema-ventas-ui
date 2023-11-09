import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/sales-system/shared/interfaces/supplier.interface';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';

@Component({
  selector: 'app-new-supplier',
  templateUrl: './new-supplier.component.html',
  styleUrls: ['./new-supplier.component.css']
})
export class NewSupplierComponent implements OnInit{

  id!: string;
  public mode?: string | null;
  supplierForm!: FormGroup;
  modeView: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private supplierService: SupplierService
  ){
    
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    if(this.mode == 'view') this.modeView = true;
    this.initForm();
    this.findSupplierById();
  }

  initForm(){
    this.supplierForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl({value: '', disabled: this.modeView}),
      documentType: new FormControl({value: '', disabled: this.modeView}),
      document: new FormControl({value: '', disabled: this.modeView}),
      address: new FormControl({value: '', disabled: this.modeView}),
      details: new FormControl({value: '', disabled: this.modeView})
    })
  }

  findSupplierById(){
    this.supplierService.findSupplierById(this.id)
    .subscribe(
      response=>{
        console.log(response)
        this.supplierForm.reset(response);
      }
    )
  }

  onConfirm(){
    if(this.id){

      this.supplierService.updateSupplier(this.supplierForm.value as Supplier)
      .subscribe(
        response=>{
          console.log(response);
        }
      )

    }else{

      this.supplierService.saveSupplier(this.supplierForm.value as Supplier)
      .subscribe(
        response=>{
          console.log(response);
        }
      );

    }

  }

}
