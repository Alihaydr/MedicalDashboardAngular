import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
 
  @Input() push:boolean = true;

  constructor (private router: Router){}


//  moveToRouteWithIndex(route:string, id:number){
//     this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
//   }


// transactions: any[] = [
//     { id: 1, product: 'Product A', consumer: 'Consumer 1', quantity: 10, status: 'Pull', date: new Date('2023-11-10T08:30:00') },
//     { id: 2, product: 'Product B', consumer: 'Consumer 2', quantity: 5, status: 'Push', date: new Date('2023-11-11T14:45:00') },
//     { id: 3, product: 'Product C', consumer: 'Consumer 3', quantity: 8, status: 'Pull', date: new Date('2023-11-12T10:15:00') },
//     { id: 4, product: 'Product A', consumer: 'Consumer 1', quantity: 10, status: 'Pull', date: new Date('2023-11-10T08:30:00') },
//     { id: 5, product: 'Product B', consumer: 'Consumer 2', quantity: 5, status: 'Push', date: new Date('2023-11-11T14:45:00') },
//     { id: 6, product: 'Product C', consumer: 'Consumer 3', quantity: 8, status: 'Pull', date: new Date('2023-11-12T10:15:00') },
//     // Add more data as needed
//   ];





}
