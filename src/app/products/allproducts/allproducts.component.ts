import { Component, Input} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent {
 
  isAscendingOrder: boolean = true;
  NameSearchKey:string = "";
  consumerId:number = 0;

  

  searchKeyEvent($event: string) {
    this.NameSearchKey = $event;
  }
  
  
  public consumerIdEvent($event:number){
    this.consumerId = $event;
  }
  
  
  


  sortProductsByExpiryDate() {
    // this.isAscendingOrder = !this.isAscendingOrder;
  
    // this.products.sort((a, b) => {
    //   const dateA = new Date(a.expiryDate);
    //   const dateB = new Date(b.expiryDate);
  
    //   // Set the time portion of the dates to midnight (00:00:00)
    //   dateA.setHours(0, 0, 0, 0);
    //   dateB.setHours(0, 0, 0, 0);
  
    //   // Calculate the difference in milliseconds
    //   const differenceA = dateA.getTime() - Date.now();
    //   const differenceB = dateB.getTime() - Date.now();
  
    //   // Sort in ascending order (nearest to farthest from current date)
    //   // If isAscendingOrder is false, sort in descending order
    //   return this.isAscendingOrder ? differenceA - differenceB : differenceB - differenceA;
    // });
      }


}