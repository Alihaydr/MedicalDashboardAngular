import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllproductsComponent} from "./allproducts/allproducts.component";
import {PushproductsComponent} from "./pushproducts/pushproducts.component";
import {PullproductsComponent} from "./pullproducts/pullproducts.component";
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import {StocksupplierGuard} from "../auth/stocksupplier.guard";
import {StockreceiverGuard} from "../auth/stockreceiver.guard";

const routes: Routes = [
  {path:'all', component:AllproductsComponent},
  {path:'push', component:PushproductsComponent,canActivate: [StocksupplierGuard]},
  {path:'pull', component:PullproductsComponent,canActivate: [StockreceiverGuard]},
  {path:'update-medicine', component:UpdateMedicineComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
