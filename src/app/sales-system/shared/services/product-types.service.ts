import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTypesService {


  SERVER ='/product-types';

  constructor(
    private httpClient: HttpClient
  ) { }

  findAllProductTypes(): Observable<any>{
    return this.httpClient.get<any[]>(`${this.SERVER}`);
  }
  
}
