import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-push-transaction',
  templateUrl: './push-transaction.component.html',
  styleUrls: ['./push-transaction.component.css']
})
export class PushTransactionComponent implements OnInit {

limit: number = 10;
  showProgressBar: boolean = true;

  isAscendingSort: boolean = false;

@Input() showAll:boolean = false;
@Input() pull:boolean = false;
@Input() arrayType: any[] = [];

  constructor(private router: Router, private service: TransactionsService){}

moveToRouteWithIndex(route:string, id:number,){
    this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
  }



getLimitedtransactions(): any[] {
    return this.pagedTransactions.slice(0, this.limit);
  }
  
onDataPerPageReceived(data:any[]){
    this.pagedTransactions = data;
  }


  // function for routing
moveToRoute(route:string){
    this.router.navigate([route]).then(() => window.scrollTo(0,0));
  }

deleteTransaction(index: number): void {
  if (index >= 0 ) {
    this.transactionsPush.splice(index, 1);
  }
}


ngOnInit(): void {
    this.getPushTransactionsPerPage(1)
  }

  allTransactionPushCount:number = 0;




  sortByID() {
    this.isAscendingSort = !this.isAscendingSort;
  
    this.transactionsPush.sort((a, b) => {
      if (this.isAscendingSort) {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
//sorting items depending on the date
sortByDate() {
  this.isAscendingSort = !this.isAscendingSort;

  this.transactionsPush.sort((a: { transactionDate: string | number | Date; }, b: { transactionDate: string | number | Date; }) => {
    const dateA = new Date(a.transactionDate);
    const dateB = new Date(b.transactionDate);

    // Set the time portion of the dates to midnight (00:00:00)
    dateA.setHours(0, 0, 0, 0);
    dateB.setHours(0, 0, 0, 0);

    if (this.isAscendingSort) {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
}

// item : any [] =

sortByQuantity() {
    this.isAscendingSort = !this.isAscendingSort;

    this.transactionsPush.sort((a, b) => {
      if (this.isAscendingSort) {
        return a.item.pullQuantity - b.item.pullQuantity;
      } else {
        return b.item.pullQuantity - a.item.pullQuantity;
      }
    });
}
  




public getPushTransactionsPerPage(pageNumber:number){

      this.service.GetTransactionPush(pageNumber).subscribe({
     
        next:(res:any)=>{  
          this.transactionsPush = res.data.first;
          this.allTransactionPushCount = res.data.second;
          this.showProgressBar = false;
        },

        error:(error:any)=>{},
        
        complete:()=>{}
      })
  }

currentPageNumberEvent($event: number) {
   this.getPushTransactionsPerPage($event +1)
  }

 getTransactionByID(id: number)
{
// this.service.GetTransactionById(id)
}


  public transactionsPush: any[] = [

  ];


pagedTransactions: any[] = [];


TransactionLength: number =  0;
searchKey:string = "";



//for the search key

searchKeyEvent($event: string) {
  this.searchKey = $event;

  if(this.searchKey != ''){
    this.getTransactionBySearchKey(this.searchKey)
  }

  else{
    this.getPushTransactionsPerPage(1);
  }

}

public getTransactionBySearchKey(searchKey:string){
this.limit=0;
this.showProgressBar=true;
  this.service.getPushTransactionBySearchKey(searchKey).subscribe({

        next:(response:any) => {
          this.transactionsPush = response.data.first;
          this.allTransactionPushCount = response.data.second
          this.pagedTransactions= this.transactionsPush;
          this.showProgressBar=false;
          this.limit=10;
        },

        error:(error:any) => {

        },

        complete:()=>{}
      })
}






}

