import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pushTransactions } from 'src/app/classes';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-push-update',
  templateUrl: './push-update.component.html',
  styleUrls: ['./push-update.component.css']
})
export class PushUpdateComponent implements OnInit {
 
  myForm: FormGroup;

  isSomethingEmpty: boolean = false;

  pushTransaction: pushTransactions = new pushTransactions();

  report:File | null = null;
  reportFileName:string = "";

  showProgressBar:boolean = false;
  message:string = ""
  error:string = ""

constructor(private route: ActivatedRoute,private fb: UntypedFormBuilder, private service: TransactionsService){
  
  this.myForm  = this.fb.group({
    item: ['',Validators.required],
    user: ['',Validators.required],
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
  this.pushTransaction![fieldName] = value
}

getTransaction(id: number)
{
this.service.getPullTransactionByID(id).subscribe({

  next:(response:any) => { this.pushTransaction = response.data; 
    
      this.myForm.setValue({
        'item': this.pushTransaction.item,
        'user': this.pushTransaction.user,
        'transactionType': this.pushTransaction.transactionType,
        'transactionDate': this.pushTransaction.transactionDate,
        'patientReportLink': this.pushTransaction.patientReportLink,
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

  if(this.pushTransaction.transactionDate == ''|| this.pushTransaction.transactionType == '' || this.pushTransaction.patientReportLink == ''  )
  {
    this.isSomethingEmpty = true;
    return
  }

  this.showProgressBar = true;

  this.service.updatePush(this.pushTransaction).subscribe({
    next:(response:any) => {
      this.error = "";
      this.message = response.data;
      this.showProgressBar = false;
      this.myForm.reset();
      this.isSomethingEmpty = false

        // this.items = []
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



}
