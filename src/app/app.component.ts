import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'medicaldashboard';
  showSignIn!: boolean;

  constructor(private authService: AuthService , private router:Router) {}

  ngOnInit() {
    this.showSignIn = false;
    const jwt = localStorage.getItem('jwtToken');
    if(jwt == null){
      this.showSignIn = true;
      this.router.navigateByUrl("/user/signin");
    }else{
      if(!this.isLoggedIn()){
        this.showSignIn = true;
        this.router.navigateByUrl("/user/signin");

      }else{
        this.showSignIn = false;
        this.router.navigate([''])
        localStorage.removeItem("items")
      }
  }



  
}

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("expireAt");
    if(expiration != null) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
}


isShowSignEvent(isShowSign:boolean){
  this.showSignIn = isShowSign
}

}
