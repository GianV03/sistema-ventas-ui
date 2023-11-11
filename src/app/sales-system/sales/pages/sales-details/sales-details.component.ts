import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit{

  efectivo!: number;
  form!: FormGroup;
  total: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef : MatDialogRef<number>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ){

  }
  ngOnInit(): void {
     this.form = this.initForm();
     this.initValues();
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      efectivo:['', []],
      card:['', []],
    })
  }

  initValues(){
    this.total = this.data.total;
  }
  
  calcularCambio() {
    return Number(this.efectivo) - this.total;
  }

}
