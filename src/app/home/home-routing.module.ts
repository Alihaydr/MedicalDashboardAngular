import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { UpdateTransactionComponent } from '../transactions/update-transaction/update-transaction.component';
import { TransactionComponentComponent } from '../shared-module/transaction-component/transaction-component.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'update-transactions', component: UpdateTransactionComponent },
  { path: 'transaction-component', component: TransactionComponentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
