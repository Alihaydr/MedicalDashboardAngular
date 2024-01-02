import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
//import { InserttransactionComponent } from './inserttransaction/inserttransaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
//import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { PushTransactionComponent } from './push-transaction/push-transaction.component';
import { PullTransactionComponent } from './pull-transaction/pull-transaction.component';
import { PagingComponent } from '../shared-module/paging/paging.component';
import { PushUpdateComponent } from './push-update/push-update.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    TransactionsComponent,
    UpdateTransactionComponent,
    PushTransactionComponent,
    PullTransactionComponent,
    PushUpdateComponent
    ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModuleModule,
    MatProgressBarModule,
  ]
})
export class TransactionsModule { }
