import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { PushTransactionComponent } from './push-transaction/push-transaction.component';
import { PullTransactionComponent } from './pull-transaction/pull-transaction.component';
import { PushUpdateComponent } from './push-update/push-update.component';

const routes: Routes = [
  {path:'pull-update', component:UpdateTransactionComponent},
  {path:'push-update', component:PushUpdateComponent},
  {path:'push', component:PushTransactionComponent},
  {path:'pull', component:PullTransactionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
