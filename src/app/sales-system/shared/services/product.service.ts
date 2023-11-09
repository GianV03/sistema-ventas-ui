import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productData } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { ProductPage } from '../interfaces/product-page.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private SERVER ='/products';

  constructor(
    private httpClient: HttpClient
  ) { }

  findAllProducts(page?: PageEvent): Observable<ProductPage> {
    let params = new HttpParams;
    if(page) params = params.append('page', page.pageIndex);
    if(page) params = params.append('size', page.pageSize);
    return this.httpClient.get<ProductPage>(`${this.SERVER}`, {params});
  }

  findProductById(id: string): Observable<productData>{
    return this.httpClient.get<productData>(`${this.SERVER}/${id}`);
  }

  saveProduct(product: productData){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(`${this.SERVER}`, product, {headers, responseType:'text'});
  }

  updateProduct(product:productData){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.put(`${this.SERVER}`, product, {headers, responseType:'text'});
  }

}
