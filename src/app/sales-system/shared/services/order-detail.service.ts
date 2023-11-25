import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderDetailService{

    SERVER: string = 'orderDetail';

    constructor(
        private httpClient: HttpClient
    ){}

    public findAllOrderDetailsByOrderId(id: string): Observable<any>{
        return this.httpClient.get<any>(`${this.SERVER}/${id}`)
    }

}