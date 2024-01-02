import { Component, OnInit } from '@angular/core';
import {CountingItem} from "../classes/counting_item";
import { CountsService } from 'src/app/services/counts.service';

@Component({
  selector: 'app-second-section',
  templateUrl: './second-section.component.html',
  styleUrls: ['./second-section.component.css']
})
export class SecondSectionComponent implements OnInit {


  constructor(private service:CountsService){}

  ngOnInit(): void {
    this.getCountsConsumer()
    this.getCountsItems();
    this.getCountsTransactionPull();
    this.getCountsTransactionPush();
  }
 

  public items_counting:CountingItem[] = [
    // new CountingItem(0,"Products",3567,5,10),
    // new CountingItem(0,"Total Income",74567,3,30),
    // new CountingItem(0,"Transactions",34567,3,30)
  ]

  public getCountsTransactionPull(){
    this.service.getTransactionCountingPull().subscribe({
      next:(response:any) =>{
        this.items_counting.push(new CountingItem(0,"Transactions Pull",response.data.count,3,30))
      },
      error:(error:any)=>{},
      complete:() => {}
    })
  }

  public getCountsTransactionPush(){
    this.service.getTransactionCountingPush().subscribe({
      next:(response:any) =>{
        this.items_counting.push(new CountingItem(0,"Transactions Push",response.data.count,3,30))
      },
      error:(error:any)=>{},
      complete:() => {}
    })
  }

  public getCountsConsumer(){
    this.service.getConsumerCounting().subscribe({
      next:(response:any) =>{
        this.items_counting.push(new CountingItem(0,"Consumers",response.data.count,3,30))
      },
      error:(error:any)=>{},
      complete:() => {}
    })
  }

  public getCountsItems(){
    this.service.getItemCounting().subscribe({
      next:(response:any) =>{
        this.items_counting.push(new CountingItem(0,"Medicines",response.data.itemCount,3,30))
      },
      error:(error:any)=>{},
      complete:() => {}
    })
  }
}
