import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Consumer } from 'src/app/classes';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-consumers-pull',
  templateUrl: './consumers-pull.component.html',
  styleUrls: ['./consumers-pull.component.css']
})
export class ConsumersPullComponent implements OnInit, OnChanges {

  lastConsumers: Consumer[] = [];
  allConsumers:Consumer[] = [];

  showProgressBar: boolean = true;

  @Input() searchKey:string = "";
  @Output() consumerId = new EventEmitter<number>;

  showPagging: boolean = true;


  limit: number = 10;

  constructor(private service:ConsumerService){}

ngOnInit(): void {
    this.getConsumerPerPage(1);
  }

ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchKey'] && changes['searchKey'].currentValue !== changes['searchKey'].previousValue ) {

      if(this.searchKey != ''){
        this.getConsumerBySearchKey(this.searchKey)
      }
    
      else{
        this.getConsumerPerPage(1);
      }
    }
  }


getLimitedconsumers(): any[] {
    return this.lastConsumers.slice(0, this.limit);
  }


public getConsumerPerPage(pageNumber:number){
  
    this.service.getConsumerPerPage(pageNumber).subscribe({
      next:(response:any) => {
          this.lastConsumers = response.data.first;
          this.allConsumers = this.getLimitedconsumers();
          this.allconsumersLength = response.data.second;
          this.showProgressBar = false;
      },
      error:(error:any) => {

      },
      complete:()=>{}
    })
  }


  searchKeyEvent() {
    
    
  
  }  

  public getConsumerBySearchKey(searchKey:string){
    this.showProgressBar=true;
    this.limit=0;
    this.service.getConsumerBySearchKey(searchKey).subscribe({
      next:(response:any) => {
        console.log(response)
        this.allConsumers = response.data.first;
        this.allconsumersLength = response.data.second
        this.pagedConsumers= this.allConsumers;
        this.showProgressBar=false;
          this.limit =10;
      },
      error:(error:any) => {
  
      },
      complete:()=>{}
    })
  }
  

consumerSelectedId: any = null;

  // ... other methods and logic

selectConsumer(id: any) {
    if (this.consumerSelectedId === id) {
      this.consumerSelectedId = null;
    } else {
      this.consumerSelectedId = id;
      this.consumerId.emit(this.consumerSelectedId);
    }
  }

  // consumers : any = []
pagedConsumers:any = [];

allconsumersLength:number = 0;
currentPageNumber:number = 0;


// public getMedicinsPerPage(pageNumber:number){
//    this.service.getConsumerPerPage(pageNumber).subscribe({
//      next:(response:any) => {
//        this.allConsumers = response.data.first;
//        this.allconsumersLength = response.data.second;
//          this.pagedConsumers= this.allConsumers;
//      },
//      error:(error:any) => {

//      },

//      complete:()=>{}
//    })
//  }

currentPageEvent($event: number) {
   this.getConsumerPerPage($event+1)
 }

onDataPerPageReceived(data:any[]){
  this.pagedConsumers = data;
}



}
