import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, catchError, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class InventoryService{

    private SERVER = 'inventory';

    constructor(
        private httpClient: HttpClient
    ){

    }

    findAllInventory(page?: number, size?: number): Observable<any>{
        let params = new HttpParams();
        if(page) params = params.append('page', page);
        if(size) params = params.append('size', size);
        return this.httpClient.get<any>(`${this.SERVER}`, {params})
        .pipe(
          catchError((e) => of())
        );
      }

      findInventoryByFilters(productName: string, productType: string, paginator: MatPaginator): Observable<any>{

        let params = new HttpParams();

        if(productName) params = params.append('productName', productName);
        if(productType) params = params.append('productType', productType);
        if(paginator) params = params.append('page', paginator.pageIndex);
        if(paginator) params = params.append('size', paginator.pageSize);

        return this.httpClient.get<any>(`${this.SERVER}/filters`, {params});

      }

}