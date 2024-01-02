import { Component } from '@angular/core';
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {


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

}
