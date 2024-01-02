import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {jwtDecode} from 'jwt-decode';
import { WebsocketService } from '../services/websocket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{


  username:string = "";
  role:string = "user";

  notifications: any[] = [];
  isSelectedAndNothingNew:boolean = true;

  isOpen:boolean = false;

  constructor(private auth:AuthService, private router:Router,
     private webSocketService:WebsocketService) {
 }

 signOut() {
    this.auth.logout()
    // this.router.navigate(['/user/signin'])
   }

  getUserInfo()
{

}

  // function for routing
  moveToRoute(route:string){
    this.router.navigate([route]).then(() => window.scrollTo(0,0));
  }

  ngOnInit(): void {

    if(this.notifications.length == 0){
        
    }

      this.webSocketService.getDangerItems().subscribe({
        next:(item:any) => {
          this.notifications.push(item);
          this.isSelectedAndNothingNew = true;

          localStorage.setItem("notifications", JSON.stringify(this.notifications));
        }
      })

      this.decodeJWTToken()
  }


  showNotifications() {
    this.isSelectedAndNothingNew = false;
    // emit the array of items on notification
    this.webSocketService.emitAllItemsInNotification(this.notifications);
    // clear all notification items
    this.isOpen = !this.isOpen;
    if(this.isOpen){
    } else {
      localStorage.removeItem("notifications");
      this.notifications = []
    }
    
  }

  decodedToken: any;

  decodeJWTToken(): void {
    let token = localStorage.getItem("jwtToken");

    if (token !== null) {
      this.decodedToken = jwtDecode(token) as { username: string, role: string  };

      if (this.decodedToken) {
        this.username = this.decodedToken.username;
        if(this.decodedToken.role == ''){
          this.role = 'user'
        }else{
          this.role = this.decodedToken.role;
        }
      }
    }
  }

  handleMenuToggleClick() {
    const sidebarNavWrapper = document.querySelector(".sidebar-nav-wrapper") as HTMLElement;
    const mainWrapper = document.querySelector(".main-wrapper") as HTMLElement;
    const menuToggleButtonIcon = document.querySelector("#menu-toggle i") as HTMLElement;
    const overlay = document.querySelector(".overlay") as HTMLElement;

    sidebarNavWrapper.classList.toggle("active");
    overlay.classList.add("active");
    mainWrapper.classList.toggle("active");

    if (document.body.clientWidth > 1200) {
      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      }
      else {
        menuToggleButtonIcon.classList.remove("lni-menu");
        menuToggleButtonIcon.classList.add("lni-chevron-left");
      }
    }
    else {

      if (menuToggleButtonIcon.classList.contains("lni-chevron-left")) {
        menuToggleButtonIcon.classList.remove("lni-chevron-left");
        menuToggleButtonIcon.classList.add("lni-menu");
      }
    }
  }



  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const sidebarNavWrapper = document.querySelector('.sidebar-nav-wrapper') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;
    const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;
    const bu = document.querySelector('.menu-toggle-btn .main-btn') as HTMLElement;

    if (document.body.clientWidth < 1200) {
      // Check if the clicked element is not within the sidebar
      if (!sidebarNavWrapper.contains(event.target as Node) && !bu?.contains(event.target as Node)) {
        // Close the sidebar
        sidebarNavWrapper.classList.remove('active');
        overlay.classList.remove('active');
        mainWrapper.classList.remove('active');
      }
    }

  }
}
