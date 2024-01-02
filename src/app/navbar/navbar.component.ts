import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from '../services/auth.service';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  elRef: any;


  // Define the isActive method to color the links in the sidebar
isActive(route: string): boolean {
  return this.router.isActive(route, true);
}

  constructor(private router:Router, private auth: AuthService) {

  }

  ngOnInit(): void {

  }

  // function for routing
moveToRoute(route:string){
  localStorage.removeItem('AddNewConsumer');
  this.handleDocumentClick()
  this.router.navigate([route]).then(() => {
    window.scrollTo(0, 0)
  });


}

  moveToHome() {
  this.handleDocumentClick();
  localStorage.removeItem('AddNewConsumer');
  this.router.navigate(['/']).then(() => window.scrollTo(0,0));
  }


  logout(){
    this.auth.logout()
    //this.router.navigate(['user/signin'])
  }



  sidebarOpen = false;
  // ... your existing methods ...

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

// Close the sidebar when clicking on the overlay
closeSidebar() {
  this.sidebarOpen = false;
}



handleDocumentClick() {

    const sidebarNavWrapper = document.querySelector('.sidebar-nav-wrapper') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;
    const mainWrapper = document.querySelector('.main-wrapper') as HTMLElement;

    if (document.body.clientWidth < 1200) {
      // Check if the clicked element is not within the sidebar
        // Close the sidebar
        sidebarNavWrapper.classList.remove('active');
        overlay.classList.remove('active');
        mainWrapper.classList.remove('active');
      }

  }

  hideUsersSection(){
    let payload = null
    let token = localStorage.getItem("jwtToken")
    if (token != null) {
      payload = jwtDecode<JwtPayload>(token)
      // @ts-ignore
      if (payload.role == "superadmin") {
        return true;
      }
    }
    return  false;
  }


  hidePullMedicineSection(){
    let payload = null
    let token = localStorage.getItem("jwtToken")
    if (token != null) {
      payload = jwtDecode<JwtPayload>(token)
      // @ts-ignore
      if (payload.role != "stocksupplier") {
        return true;
      }
    }
    return  false;
  }


  hidePushMedicineSection(){
    let payload = null
    let token = localStorage.getItem("jwtToken")
   
    if (token != null) {
      payload = jwtDecode<JwtPayload>(token)
      // @ts-ignore
     
      if (payload.role != "stockreceiver") {
        return true;
      }
    }
    
    return  false;
  }




}
