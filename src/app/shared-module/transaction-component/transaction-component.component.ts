import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transaction-component',
  templateUrl: './transaction-component.component.html',
  styleUrls: ['./transaction-component.component.css']
})
export class TransactionComponentComponent implements OnInit {

@Input() showAll:boolean = true;
@Input() showPaging:boolean = false;
@Input() pull:boolean = false;
@Input() limit:number = 5;
@Input() showSearch : boolean = false;
@Input() showTitle : boolean = true;

TransactionLength: number =  0;
searchKey:string = "";

showWaitMessage:boolean = false;
error:string = '';

showProgressBar: boolean = true;
clickedRowIndex: number = -1;

isAscendingSort: boolean = false;

dataSource = new MatTableDataSource<any>(/* your data array */);

constructor(private router: Router, private service: TransactionsService){}



//sorting items depending on the date
sortByDate() {
  this.isAscendingSort = !this.isAscendingSort;

  this.transactionsPull.sort((a: { transactionDate: string | number | Date; }, b: { transactionDate: string | number | Date; }) => {
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

    this.transactionsPull.sort((a, b) => {
      if (this.isAscendingSort) {
        return a.item.pullQuantity - b.item.pullQuantity;
      } else {
        return b.item.pullQuantity - a.item.pullQuantity;
      }
    });
}


sortByID() {
  this.isAscendingSort = !this.isAscendingSort;

  this.transactionsPull.sort((a, b) => {
    if (this.isAscendingSort) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
}



moveToRouteWithIndex(route:string, id:number,){
    this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
  }

// deleteTransaction(index: number): void {

//   if (index >= 0 ) {

//     this.clickedRowIndex = index;
//     this.showProgressBar = true;

//   this.service.DeleteTransactionById(index).subscribe({
//     next:(response:any) => {
//       this.transactionsPull.splice(index, 1);
//       this.showProgressBar = false;
//     },
//     error:(error:any) => {
//       this.showProgressBar = false;
//     },

//     complete:()=>{}
//   })
//   }
// }

ngOnInit(): void {
    this.getPullTransactionsPerPage(1)
  }

  allTransactionPullCount:number = 0;

public getPullTransactionsPerPage(pageNumber:number){
 
      this.service.GetTransactionPull(pageNumber).subscribe({
        next:(res:any)=>{
          this.transactionsPull = res.data.first;
          this.pagedTransactions = this.transactionsPull;
          this.allTransactionPullCount = res.data.second;
          this.showProgressBar=false;
        },
        error:(error:any)=>{},
        complete:()=>{}
      })
  }

currentPageNumberEvent(pageNumber:number){
    this.getPullTransactionsPerPage(pageNumber+1)
  }

// function for routing
moveToRoute(route:string){
    this.router.navigate([route]).then(() => window.scrollTo(0,0));
  }

transactionsPull: any[] = [];

pagedTransactions: any[] = [];


getLimitedtransactions(): any[] {
  return this.pagedTransactions.slice(0, this.limit);
}

onDataPerPageReceived(data:any[]){
  this.pagedTransactions = data;
}



deleteTransaction(index:number,id:number, itemId:number, quantityRemove:number) {
  this.clickedRowIndex = index;
  this.error = "";
this.showWaitMessage = true;
  this.service.DeleteTransactionById(id, itemId, quantityRemove).subscribe({
      next:(response:any) => {
          this.showWaitMessage = false;
          this.pagedTransactions = this.pagedTransactions.filter((e) => {
              return e.id != id
          })
          this.transactionsPull = this.transactionsPull.filter((e) => {
              return e.id != id
          })
      },
      error:(error:any) => {
          this.showWaitMessage = false;
          this.error = error;
      },
      complete:() => {}
  })
}



//for the search key

searchKeyEvent($event: string) {
  this.searchKey = $event;

  if(this.searchKey != ''){
    this.getTransactionBySearchKey(this.searchKey)
  }

  else{
    this.getPullTransactionsPerPage(1);
  }

}

public getTransactionBySearchKey(searchKey:string){
  this.limit=0;
  this.showProgressBar=true;
  this.service.getPullTransactionBySearchKey(searchKey).subscribe({

        next:(response:any) => {
          this.transactionsPull = response.data.first;
          this.allTransactionPullCount = response.data.second
          this.pagedTransactions= this.transactionsPull;
          this.showProgressBar=false;
          this.limit=10;
        },

        error:(error:any) => {

        },

        complete:()=>{}
      })
}

  showDetails: boolean[] = Array(this.getLimitedtransactions().length).fill(false);

  // Function to toggle the display of additional items
  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }
}


