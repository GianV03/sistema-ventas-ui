import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { productData} from '../../../shared/interfaces/product.interface';
import { ProductService } from 'src/app/sales-system/shared/services/product.service';
import { ProductTypesService } from 'src/app/sales-system/shared/services/product-types.service';
import { SupplierService } from 'src/app/sales-system/shared/services/supplier.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'products-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{
  public id!:string;
  public mode?: string | null;
  public modeView: boolean = false;
  public product!: productData;
  public productForm!: FormGroup;
  public productTypes?: any[];
  public selectedSupplier?:any;
  public selectedType!: any;
  public suppliers!: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private productTypeService: ProductTypesService,
    private router: Router,
    private supplierService: SupplierService
  ){

  }
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.mode = this.activatedRoute.snapshot.paramMap.get('mode');
    
    if(this.mode == 'view') this.modeView = true;
    this.initForm();
    this.initValues();
  }

  initValues(){
    this.findAllProductTypes();
    this.findAllSuppliers();

    if(this.id && this.id!=''){
      this.findProductById();
    }

  }

  initForm(){
    this.productForm = this.formBuilder.group({
      id: [{value:''}],
      name:[{value:'', disabled: this.modeView}],
      typeId:[{value:'', disabled: this.modeView}],
      purchasePrice:[{value:'', disabled: this.modeView}],
      salePrice:[{value:'', disabled: this.modeView}],
      supplierId:[{value:'', disabled: this.modeView}],
      details:[{value:'', disabled: this.modeView}]
    })
  }

  findProductById(){
    this.productService.findProductById(this.id)
    .subscribe(
      response=>{
        this.product = response;
        this.getId().setValue(this.id);
        this.getName().setValue(this.product.name);
        this.getPurchasePrice().setValue(this.product.purchasePrice);
        this.getSalePrice().setValue(this.product.salePrice);
        this.getDetails().setValue(this.product.details);

        this.selectedType = this.product.typeId;
        this.selectedSupplier = this.product.supplierId;
      }
    )
  }

  findAllProductTypes(){
    this.productTypeService.findAllProductTypes()
    .subscribe(
      response=>{
        this.productTypes = response;
      }
    )
  }

  findAllSuppliers(){
    this.supplierService.findAllSuppliers()
    .subscribe(
      response=>{
        this.suppliers = response;
      }
    )
  }

  onConfirm(){
    // update product
    if(this.id && this.id != ''){
      
      const confirmation = this.confirmationDialog("¿Está seguro de actualizar el producto?", "sí", "cancelar")
      .subscribe(
        response=>{
          
          if(response == true){

            // Se actualiza el producto
            this.productService.updateProduct(this.productForm.value as productData)
            .subscribe(
              response =>{
                Swal.fire("Se ha actualizado el producto", "", "success");
                this.router.navigate(['/']);
              },
              error=>{
                Swal.fire("No se ha podido actualizar el producto", "", "error");
              }
            );
              }
          
        }
        );
    }
    else{
      // Create product
    {
      
      this.confirmationDialog("¿Está seguro de registrar el producto?", "sí", "cancelar")
      .subscribe(
        response=>{
          
          if(response == true){

            // Se crea el producto
            this.productService.saveProduct(this.productForm.value as productData)
            .subscribe(
              response =>{
                Swal.fire("Se ha creado el producto", "", "success");
                this.router.navigate(['/']);
              },
              error=>{
                Swal.fire("No se ha podido crear el producto", "", "error");
              }
            );
              }
          
        }
        );

    }
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

  getId(){
    return this.productForm.get('id')!;
  }

  getName(){
    return this.productForm.get('name')!;
  }

  getType(){
    return this.productForm.get('typeId')!;
  }

  getPurchasePrice(){
    return this.productForm.get('purchasePrice')!;
  }

  getSalePrice(){
    return this.productForm.get('salePrice')!;
  }

  getSupplier(){

  }

  getDetails(){
    return this.productForm.get('details')!;
  }

}
