import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/classes';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-addconsumer',
  templateUrl: './addconsumer.component.html',
  styleUrls: ['./addconsumer.component.css']
})
export class AddconsumerComponent implements OnInit {

  myForm: FormGroup;
  isSomethingEmpty:boolean = false;
  
  consumer:Consumer = new Consumer()
  document:File | null = null
  showProgressBar: boolean = false;
  message:string = "";
  error:string = "";

  showBtnBack : boolean = false;

  constructor(private service:ConsumerService,private fb: UntypedFormBuilder, private router:Router) {
    if (localStorage.getItem('AddNewConsumer') =='FromPull')
    this.showBtnBack = true;

console.log(localStorage.getItem('AddNewConsumer'))

    this.myForm  = this.fb.group({
      name: ['',Validators.required],
      dateofbirth: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      filename: ['',Validators.required],
      location: ['',Validators.required],
      documents: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }







  addConsumer() {

    if(this.consumer.name == '' || this.consumer.phoneNumber == '' || 
         this.consumer.birthdate == '' || this.consumer.location == ''|| this.consumer.documents == ''){
        this.isSomethingEmpty = true
        return;
    }

    this.showProgressBar = true;
    this.isSomethingEmpty = false;
    this.service.addConsumer(this.consumer, this.document).subscribe({
    
      next:(response:any) => {    
        this.error = ""
         this.message = response.data
         this.showProgressBar = false;
         this.myForm.reset();
         if(this.showBtnBack){
          this.router.navigate(['/products/pull'])
         }
      },

      error:(error:any) => {
        this.message = ""
        this.error = error
        this.showProgressBar = false;
      },
      complete:() => {}
    })
  }


  onFieldChange(fieldName: string, value: string) {
    this.consumer![fieldName] = value
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
          this.myForm.patchValue({filename: fileName});
          this.onFieldChange('documents', fileName);
    }else{
      this.document = null;
    }
  }
}




}
