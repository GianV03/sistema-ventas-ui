import { Supplier } from "./supplier.interface";

export interface Inventory{
    id?: string,
    supplier: string;
    supplierId: string;
    product: string;
    stock: number;
    state: number;
}