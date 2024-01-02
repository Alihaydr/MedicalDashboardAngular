import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {

message:string = ""
error:string = ""

@Input() showDays:boolean = true;
@Input() showPaging:boolean = true;
@Input() limit:number = 5;
@Input() showTitle:boolean = true;


//length array for the pagging
consumerLength: number =  0;

searchKey:string = "";

showProgressBar: boolean = true;
clickedRowIndex: number = -1;

pagedConsumers: any[] = [];
consumers :any = [  ];



isAscendingSort: boolean = false;

constructor (private router:Router, private consumerService:ConsumerService) {

}


//sorting items depending on the date
sortByBirthDate() {
  this.isAscendingSort = !this.isAscendingSort;

  this.consumers.sort((a: { birthdate: string | number | Date; }, b: { birthdate: string | number | Date; }) => {
    const dateA = new Date(a.birthdate);
    const dateB = new Date(b.birthdate);

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


ngOnInit(): void {
    this.getConsumerPerPage(1)
}


navigateToDetails(consumerId: string) {
    this.router.navigate(['/consumers/details', consumerId]);
  }

deleteConsumer(index: number) {

    if (index >= 0 ) {

      this.clickedRowIndex = index;
      this.showProgressBar = true;

    this.consumerService.deleteCon(this.consumers[index].id).subscribe({
      next:(response:any) => {
        this.consumers.splice(index, 1);
        this.showProgressBar = false;
      },
      error:(error:any) => {
        this.showProgressBar = false;
      },

      complete:()=>{}
    })
    }
}

moveToRouteWithIndex(route:string, id:number){
    this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
  }

  // function for routing
moveToRoute(route:string){
    this.router.navigate([route]).then(() => window.scrollTo(0,0));
  }




public getConsumerPerPage(pageNumber:number){
  this.consumerService.getConsumerPerPage(pageNumber).subscribe({
    next:(response:any) => {
        this.consumers = response.data.first;
        this.consumerLength = response.data.second
        this.pagedConsumers= this.consumers;
        this.showProgressBar=false;
    },
    error:(error:any) => {

    },
    complete:()=>{}
  })
}


public getConsumerBySearchKey(searchKey:string){
  this.showProgressBar=true;
  this.limit=0;
  this.consumerService.getConsumerBySearchKey(searchKey).subscribe({
    next:(response:any) => {
      this.consumers = response.data.first;
      this.consumerLength = response.data.second
      this.pagedConsumers= this.consumers;
      this.showProgressBar=false;
        this.limit =10;
    },
    error:(error:any) => {

    },
    complete:()=>{}
  })
}


currentPageEvent(currentPage:number){
    this.getConsumerPerPage(currentPage +1)
}


getLimitedconsumers(): any[] {
  return this.pagedConsumers.slice(0, this.limit);
}

onDataPerPageReceived(data:any[]){
  this.pagedConsumers = data;
}

searchKeyEvent($event: string) {
    this.searchKey = $event;

    if(this.searchKey != ''){
      this.getConsumerBySearchKey(this.searchKey)
    }else{
      this.getConsumerPerPage(1)
    }

  }


}
