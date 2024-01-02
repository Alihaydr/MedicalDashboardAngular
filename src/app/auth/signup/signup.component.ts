import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/classes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public username:string = "";
  public password:string = "";
  public phoneNumber:string = "";
  public birthDay:string = "";
  public id:number = 0 ;
  public selectedRole: string = '';
  public isSomethingEmpty:boolean = false

  showProgressBar:boolean = false;
  message:string = ""
  error:string = ""

  // adminSelected : boolean = false;
  // SuperAdminSelected : boolean = false;

  public userinfo:SignUp | null = null

  constructor(private auth:AuthService,private router:Router) {
        //hon akhdt l value lal role
        const navigation = this.router.getCurrentNavigation();
        if (navigation?.extras?.state) {
          const roleSelected = navigation?.extras?.state['addedRole'];
          this.selectedRole = roleSelected;
        }
  }


  ngOnInit(): void {

  }




  signUp(){
    this.message = "";
    this.error = ""
    if(
      this.username == '' ||
        this.password == '' ||
        this.phoneNumber == ''||
      this.birthDay == '' ||
      this.selectedRole == ''
    ){
      this.isSomethingEmpty = true;
      return;
    }

    this.userinfo = new SignUp(this.id, this.username, this.selectedRole,this.birthDay, this.password, this.phoneNumber,"img");

    this.showProgressBar = true;
    this.auth.signUp(this.userinfo).subscribe({
      next: (response: any)=>{
        this.showProgressBar = false;
        this.message = response.data
        this.router.navigate(['/SuperAdmin/all']);
      },
      error: (error: any)=> {
        this.showProgressBar = false;
        this.error = error
      },
      complete: ()=>{}
    });
  }



}
