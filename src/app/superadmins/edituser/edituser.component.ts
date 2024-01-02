import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit{

  user:any = null
  showProgressBar: boolean = false;
  message :string = "";
  error:string = "";
  public isSomethingEmpty:boolean = false
  userId:number = 0

  constructor(private userService:UsersService,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
       this.userId = params['id']; // Assuming 'userId' is the query parameter name

      if (this.userId) {
        // Perform your logic using the captured query parameter
        this.userService.GetUserById(this.userId).subscribe(
          {
            next: (response: any) => {
              this.user = response.data;
            },
            error: (error: any) => {},
            complete: () => {}
          }
        );
      }
    });
  }

  updateUser() {
    this.message = "";
    this.error = ""

    if(
      this.user.username == '' ||
      this.user.password == '' ||
      this.user.phoneNumber == ''||
      this.user.birthDay == '' ||
      this.user.selectedRole == ''
    ){
      this.isSomethingEmpty = true;
      return;
    }


    this.showProgressBar = true;
    this.userService.updateUserBy(this.user).subscribe(
      {
        next:(response:any) => {
          this.showProgressBar = false;
          this.message = response.message;
        },
        error:(error:any) => {
          this.showProgressBar = false;
          this.error = error
        },
        complete:() => {}
      }
    )
  }
}
