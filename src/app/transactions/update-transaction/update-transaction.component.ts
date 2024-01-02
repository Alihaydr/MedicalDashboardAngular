import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumer, Item, pullTransactions } from 'src/app/classes';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css']
})

export class UpdateTransactionComponent implements OnInit{

  myForm: FormGroup;

  isSomethingEmpty: boolean = false;

  items: Item = new Item();
  consumer: Consumer = new Consumer();

  pullTransaction: pullTransactions = new pullTransactions();

  report:File | null = null;
  reportFileName:string = "";

  showProgressBar:boolean = false;
  message:string = ""
  error:string = ""

constructor(private route: ActivatedRoute,private fb: UntypedFormBuilder, private service: TransactionsService){
  
  this.myForm  = this.fb.group({
    item: ['',Validators.required],
    consumer: ['',Validators.required],
    transactionType: ['',Validators.required],
    transactionDate: ['',Validators.required],
    patientReportLink:['',Validators.required],
  });

}


ngOnInit(): void {
  this.route.queryParams.subscribe(params =>{
    const transactionID = params['id'];
    this.getTransaction(transactionID);
  })
}


onFieldChange(fieldName: string, value: string) {
  this.pullTransaction![fieldName] = value
}


getTransaction(id: number)
{
this.service.getPullTransactionByID(id).subscribe({

  next:(response:any) => { this.pullTransaction = response.data; 
    
      this.myForm.setValue({
        'item': this.pullTransaction.item,
        'consumer': this.pullTransaction.consumer,
        'transactionType': this.pullTransaction.transactionType,
        'transactionDate': this.pullTransaction.transactionDate,
        'patientReportLink': this.pullTransaction.patientReportLink,
      });


    },
   
    error:(error:any) => {},
    
    complete:() => {}
  })
}


updatePullTransaction(){
  this.error = "";
  this.message = "";
  // this.item.categories = this.categories;
  // this.pullTransaction.variants = this.pullTransaction.variants;
  if( this.pullTransaction.transactionDate == ''|| this.pullTransaction.transactionType == '' || this.pullTransaction.patientReportLink == ''  )
  {
    this.isSomethingEmpty = true;
    return
  }

  this.showProgressBar = true;

  this.service.updatePull(this.pullTransaction).subscribe({
    next:(response:any) => {
      this.error = "";
      this.message = response.data;
      this.showProgressBar = false;
      this.myForm.reset();
      this.isSomethingEmpty = false;
   
      // this.items = []
      this.consumer = []
    },
    error:(error:any) => {
      this.error = error;
      this.showProgressBar = false;
    },
    complete:() => {}
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
        this.report = selectedFile;
        this.reportFileName = fileName;

  }else{
    this.report = null;
  }
}
}


// moveToRouteWithIndex(route:string, id:number){
//   this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
// }


}