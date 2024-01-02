import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit{

  user:any = null;

  constructor(private userService:UsersService) {
  }
  ngOnInit(): void {
    let payload  = null
    let token = localStorage.getItem("jwtToken")
    if(token != null){
      payload = jwtDecode<JwtPayload>(token)

      // @ts-ignore
      this.userService.GetUserById(payload.id).subscribe(
        {
          next: (response: any) => {
            this.user = response.data;
          },
          error: (error: any) => {},
          complete: () => {}
        }
      );
    }

  }


}
