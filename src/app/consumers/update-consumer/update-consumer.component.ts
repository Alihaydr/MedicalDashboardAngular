import {Component, OnInit} from '@angular/core';
import {ConsumerService} from "../../services/consumer.service";
import {Consumer} from "../../classes";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-consumer',
  templateUrl: './update-consumer.component.html',
  styleUrls: ['./update-consumer.component.css']
})
export class UpdateConsumerComponent implements  OnInit{

  consumer:Consumer = new Consumer()
  message:string = ""
  error:string = ""
  showProgressBar:boolean = false;
  document:File | null = null;
  public isSomethingEmpty: boolean = false;

  constructor(private consumerService:ConsumerService,private route: ActivatedRoute) {
  }

  public getConsumerById(consumerID:number){
    this.consumerService.getConsumerById(consumerID).subscribe({
      next:(response:any) => {
        this.consumer = response.data
      },
      error:(error:any) => {
        this.error = error
      },
      complete:() => {}
    })
  }

  UpdateConsumer() {
    this.message = ""
    this.error = ""

    if(this.consumer.name == ''){
      this.isSomethingEmpty = true;
      return
    }
    this.isSomethingEmpty = false;

    this.showProgressBar = true;

    this.consumerService.updateConsumer(this.consumer, this.document).subscribe({
      next:(response:any) => {
        this.message = response.data
        this.showProgressBar = false;
      },
      error:(error:any) => {
        this.error = error
        this.showProgressBar = false;

      },
      complete:() => {}
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const consumerId = params['id'];
      this.getConsumerById(consumerId)
    });
  }

  handleFileInput(event: Event) {

    const inputElement = event.target as HTMLInputElement;
    const selectedFile = inputElement.files ? inputElement.files[0] : null;

    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop()!.toLowerCase();

      // Check file extension
      if (fileExtension === 'pdf' || fileExtension === 'docx' || fileExtension === 'jpeg' || fileExtension === 'png') {

        this.document = selectedFile;
      }else{
        this.document = null;
      }
    }
  }
}
