import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  done:boolean = true;
  
  constructor() {
    setTimeout(() => {  this.done = false }, 1000);
  }
  
}
