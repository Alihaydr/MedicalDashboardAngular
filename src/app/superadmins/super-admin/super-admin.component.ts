import {Component, Input, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {  Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {UsersService} from "../../services/users.service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit{

  @Input() limit: number = 10;

  public users:any[] = [];

  showProgressBar: boolean = true;
  error:string =""
  wait:boolean = false;
  clickedRowIndex: number = -1;

  
  isAscendingSort: boolean = false;

  // dataSource = new MatTableDataSource<any>(/* your data array */);

  constructor(private router: Router, private service: AuthService, private userService:UsersService) {
  }

  moveToRouteWithIndex(route: string, id: number,) {
    this.router.navigate([route], {queryParams: {id: id}}).then(() => window.scrollTo(0, 0));
  }


  moveTAddWithRole() {
    this.router.navigate(['/auth/signup']).then(() => window.scrollTo(0, 0));

  }



getAllUsers(){
      this.service.getUsers().subscribe({
        next:(response:any) => {
      
          this.users = response.data

          for(let i=0; i<this.users.length; i++){
            if(this.users[i].role=="superadmin")
         {  this.users = this.users.filter(item => !item.role.includes("superadmin")); }
          }

          // console.log(response.data)
          this.showProgressBar=false;
        },
        error:(error:any) => {},
        complete:() => {}
      })
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

// function for routing
moveToRoute(route:string){
    this.router.navigate([route]).then(() => window.scrollTo(0,0));
  }

deleteUser(id:number, index:number) {
  this.clickedRowIndex = index;
  this.showProgressBar = true;
  this.userService.deleteUserById(id).subscribe(
    {
      next:(response:any) => {
        this.showProgressBar = false;
        this.users = this.users.filter((user:any) => user.id != id)
      },
      error:(error:any) => {
        this.showProgressBar = false;
        this.error = error
      },
      complete:() => {}
    }
  )
}


 getTransactionByID(id: number)
{
// this.service.GetTransactionById(id)
}


AllUsers() {
    return (this.pagedUsers = this.users);
  }


UserType(value: any) {
    this.pagedUsers = [];

    let i = 0; // j for the new index
    let j = 0;

    while (i < this.users.length) {
      if (this.users[i].role == value) {
        this.pagedUsers[j] = this.users[i];
        i++;
        j++;
      } else {
        i++;
      }
    } //end for while loop
    return this.pagedUsers;
  } //end for func Satin


pagedUsers: any[] = this.users;

getLimitedtransactions(): any[] {
  return this.pagedUsers.slice(0, this.limit);
}
//
onDataPerPageReceived(data:any[]){
  this.pagedUsers = data;
}







sortByID() {
  this.isAscendingSort = !this.isAscendingSort;

  this.users.sort((a, b) => {
    if (this.isAscendingSort) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });
}

//sorting items depending on the date
sortByDate() {
this.isAscendingSort = !this.isAscendingSort;

this.users.sort((a: { transactionDate: string | number | Date; }, b: { transactionDate: string | number | Date; }) => {
  const dateA = new Date(a.transactionDate);
  const dateB = new Date(b.transactionDate);

  // Set the time portion of the dates to midnight (00:00:00)
  dateA.setHours(0, 0, 0, 0);
  dateB.setHours(0, 0, 0, 0);

  if (this.isAscendingSort) {
    return dateA.getTime() - dateB.getTime();
  } else {
    return dateB.getTime() - dateA.getTime();
  }
});
}

// item : any [] =

sortByQuantity() {
  this.isAscendingSort = !this.isAscendingSort;

  this.users.sort((a, b) => {
    if (this.isAscendingSort) {
      return a.item.pullQuantity - b.item.pullQuantity;
    } else {
      return b.item.pullQuantity - a.item.pullQuantity;
    }
  });
}






}
