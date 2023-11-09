import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Observable } from "rxjs";
import { Supplier } from "../interfaces/supplier.interface";

@Injectable({
    providedIn: "root"
})
export class SupplierService{

    SERVER ='/suppliers';

    constructor(
        private httpClient: HttpClient
    ){}

    findAllSuppliers(): Observable<any>{
        return this.httpClient.get<any>(`${this.SERVER}`);
    }

    
    findSuppliers(page: PageEvent): Observable<any>{
        let params = new HttpParams;
        if(page) params = params.append('page', page.pageIndex);
        if(page) params = params.append('size', page.pageSize);
        
        return this.httpClient.get<any>(`${this.SERVER}/page`);
    }

    findSupplierById(id: string){
        return this.httpClient.get<any>(`${this.SERVER}/${id}`);
    }

    saveSupplier(supplaier : Supplier){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.httpClient.post(`${this.SERVER}`, supplaier, {headers, responseType:'text'});
    }

    updateSupplier(supplier: Supplier){
        const headers = new HttpHeaders({
            'content-type': 'application/json'
        });

        return this.httpClient.put(`${this.SERVER}`, supplier, {headers, responseType: 'text'});
    }

}