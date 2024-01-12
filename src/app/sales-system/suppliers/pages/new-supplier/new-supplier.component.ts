import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/sales-system/shared/interfaces/supplier.interface';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';
import Swal from 'sweetalert2';

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
    private router: Router,
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

      const confirmation = this.confirmationDialog("¿Está seguro de actualizar el proveedor?", "sí", "cancelar")
      .subscribe(
        response=>{
          
          if(response == true){

            this.supplierService.updateSupplier(this.supplierForm.value as Supplier)
            .subscribe(
              response =>{
                Swal.fire("Se ha actualizado el proveedor", "", "success");
                this.router.navigate(['/proveedores']);
              },
              error=>{
                Swal.fire("No se ha podido actualizar el proveedor", "", "error");
              }
            );

          }
        }
        );

    }else{

      this.confirmationDialog("¿Está seguro de registrar el producto?", "sí", "cancelar")
      .subscribe(
        response=>{
          
          if(response == true){
            this.supplierService.saveSupplier(this.supplierForm.value as Supplier)
            .subscribe(
              response =>{
                Swal.fire("Se ha registrado el proveedor", "", "success");
                this.router.navigate(['/proveedores']);
              },
              error=>{
                Swal.fire("No se ha podido registrar el proveedor", "", "error");
              }
            );
          }
        }
      );
  }
  }


  confirmationDialog(title: string, confirm: string, deny: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      Swal.fire({
        title: title,
        showDenyButton: true,
        confirmButtonText: confirm,
        denyButtonText: deny
      }).then((result) => {
        // Se confirma la acción
        if (result.isConfirmed) {
          observer.next(true);
          observer.complete();
        } else if (result.isDenied) {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }

}
