import { Component, Input, OnInit } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-pull-transaction',
  templateUrl: './pull-transaction.component.html',
  styleUrls: ['./pull-transaction.component.css']
})
export class PullTransactionComponent implements OnInit {

  constructor(private transactionService:TransactionsService){}
  
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


}
