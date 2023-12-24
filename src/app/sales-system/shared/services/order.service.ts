import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService{


    private SERVER = 'orders';

    constructor(
        private httpClient: HttpClient
    ){}


    public findAllOrders(): Observable<any>{
        return this.httpClient.get(`${this.SERVER}`)
        .pipe(
            catchError(e => of())
        )
    }

    public findOrderById(id: string): Observable<any>{
        return this.httpClient.get<any>(`${this.SERVER}/id/${id}`)
        .pipe(
            catchError(e => of())
        )
    }

    public createOrder(order: any): Observable<any>{

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
          
        return this.httpClient.post(`${this.SERVER}`, order, {headers, responseType:'text'})
    }

}