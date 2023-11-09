import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { Inventory } from "../interfaces/inventory.interface";


@Injectable({
    providedIn: 'root'
})
export class InventoryService{

    private SERVER = 'inventory';

    constructor(
        private httpClient: HttpClient
    ){

    }

    findAllInventory(): Observable<any>{
        return this.httpClient.get<any>(`${this.SERVER}`)
        .pipe(
          catchError((e) => of())
        );
      }

}