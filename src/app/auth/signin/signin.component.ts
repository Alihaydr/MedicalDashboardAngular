import { Component, EventEmitter, Output } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { logInInfo } from 'src/app/classes';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  myForm: FormGroup;

  public userinfo:logInInfo = new logInInfo()
  showProgressBar: boolean = false;
  showErrorMessage:boolean = false;
  isSomethingEmpty:boolean = false;

  @Output() isShowSign = new EventEmitter<boolean>

  constructor(private router:Router, private signService: AuthService,private fb: UntypedFormBuilder) {
    this.myForm  = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',Validators.required],
    });
  }
  
  signIn(){

    if(this.userinfo.username == '' || this.userinfo.password == ''){
      this.isSomethingEmpty = true;
      return
    }

    else{
      this.isSomethingEmpty = false;
    }

    this.showProgressBar = true;

    this.signService.LogIn(this.userinfo).subscribe({
    
      next: (response: any)=>{
        this.showProgressBar = false;
        localStorage.setItem('jwtToken', response.data.token);
        localStorage.setItem('expireAt',response.data.expireAt);

        this.router.navigate(['/']);
        this.isShowSign.emit(false)
      }, 

      error: (error: any)=> {
       this.showErrorMessage = true;
      this.showProgressBar = false;  
      this.isShowSign.emit(true)
     },

      complete: ()=>{}

    }); 
  }
  
  onFieldChange(fieldName: string, value: string) {
    this.userinfo![fieldName] = value
  }
  
}
