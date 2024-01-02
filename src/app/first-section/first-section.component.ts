import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-section',
  templateUrl: './first-section.component.html',
  styleUrls: ['./first-section.component.css']
})
export class FirstSectionComponent {

  @Input() item_active: string = "Home";
  @Input() home: boolean = false;


     constructor(private router:Router){}


  // function for routing
  moveToRoute(route:string){
    this.router.navigate([route]).then(() => {
      window.scrollTo(0, 0)
    });

}

}
