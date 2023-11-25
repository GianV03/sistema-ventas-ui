import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsMainComponent } from "./pages/products-main/products-main.component";
import { NewProductComponent } from "./pages/new-product/new-product.component";

const routes: Routes =[
    {
        path:'',
        component: ProductsMainComponent
    },
    {
        path: 'nuevo',
        component: NewProductComponent
    },
    {
        path: 'editar',
        component: NewProductComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductsRoutingModule{

}