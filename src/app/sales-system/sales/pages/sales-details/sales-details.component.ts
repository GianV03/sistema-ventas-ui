import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.css']
})
export class SalesDetailsComponent implements OnInit{

  efectivo!: number;
  form!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ){

  }
  ngOnInit(): void {
     this.form = this.initForm();
  }

  initForm(): FormGroup{
    return this.formBuilder.group({
      efectivo:['', []],
      card:['', []],
    })
  }

  
  calcularCambio() {
    return 1000 - Number(this.efectivo);
  }

}
