import {Component, EventEmitter,Output, Input, OnInit, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { MainQty, tempA } from 'src/app/classes';

@Component({
  selector: 'app-products-component',
  templateUrl: './products-component.component.html',
  styleUrls: ['./products-component.component.css'],
})


export class ProductsComponentComponent implements OnInit, OnChanges {



    @Input() showbtn:boolean = false;
    @Input() showSearch:boolean = false;
    @Input() showActions:boolean = true;
    @Input() showPic:boolean = true;
    @Input() showPull:boolean = true;
    @Input() showAddBtn:boolean = false;
    @Input() showAllMed:boolean = true;
    @Input() showQtyinput:boolean = false;
    @Input() showActionBtn:boolean = true;
    @Input() showQty:boolean = true;
    @Input() showDanger : boolean = false;
    @Input() showTitle:boolean = true;
    @Input() showNotes:boolean = true;
    @Input() showDays:boolean = true;
    @Input() showPagging:boolean = false;
    @Input() limit:number = 5;
    @Input() maxQtyAllowed:number = 0;
  @Input() deletedMedFromPull:any;

    
    showProgressBar: boolean = true;
    
    clickedRowIndex: number = -1;

    //lama bde ekhod shi mn child 3l bay
@Output() public output = new EventEmitter<any[]>;
// @Output() public addedMED = new EventEmitter<any[]>;
// @Output() public medsAdded = new EventEmitter<any[]>;

    expiryDate : Date = new Date ();
    quantity : number = 1;

    // new Quantity pulled
    newQty : number = 0;

    isAscendingSort: boolean = false;
    // dataSource = new MatTableDataSource<any>(/* your data array */);

    //all products in database --> products array
    products: any[] = [ ];

    //products displayed on page
    pagedProducts: any[] = [];
    zeroQuantityProducts: any[] = [];

    //for the search and pagging
    allproductsLength:number = 0;
    searchKey:string = "";
    currentPageNumber:number = 0;
  quantityTemA: number = 0;

  
    constructor(private router:Router, private medicinsService:ProductsService){ 

    }

    
AllMed() {
    return (this.pagedProducts = this.products);
  } //end for func All

TodayVsYesterday(day: string) {
  this.pagedProducts = [];
  const currentDate = new Date();

  let comparisonDate: Date;

  if (day === 'far') {
    comparisonDate = new Date(currentDate);
  } else {
    comparisonDate = new Date(currentDate);
    comparisonDate.setDate(comparisonDate.getDate() - 30);
  }

  for (let i = 0; i < this.products.length; i++) {
    const productExpiryDate = new Date(this.products[i].expiryDate);
    const comparisonDateString = comparisonDate.toISOString().split('T')[0];


// function for comparing today date with the expiry date
// TodayVsYesterday(day: string) {
//   this.pagedProducts = [];
//   const currentDate = new Date();

//   let comparisonDate: Date;

//   if (day === 'far') {
//     comparisonDate = new Date(currentDate);
//   }
//   else {
//     comparisonDate = new Date(currentDate);
//     comparisonDate.setDate(comparisonDate.getDate() - 30);
//   }

//   for (let i = 0; i < this.products.length; i++) {
//     const productExpiryDate = new Date(this.products[i].expiryDate);
//     const comparisonDateString = comparisonDate.toISOString().split('T')[0];

//     if (productExpiryDate.toISOString().split('T')[0] === comparisonDateString) {
//       this.pagedProducts.push(this.products[i]);
//     }
//   }


//   return this.pagedProducts;
// }

  }
}

ngOnInit(): void {
    this.getMedicinsPerPage(1);
    this.initializeDesiredQuantities();
    // this.showProgressBar=false;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['searchKey'] && changes['searchKey'].currentValue !== changes['searchKey'].previousValue ) {

  //     if(this.searchKey !== ''){
  //       this.getMedicineBySearchKey(this.searchKey)
  //     }
  //   }
  // }

desiredQuantities: number[] = []; // Array to store desired quantities



// function for comparing Quantity for green adn red color
compareQuantity (MedicineQuantity: number) : boolean
{
   const QuantityMinimum = 30;

   if (MedicineQuantity <= QuantityMinimum) {
     return true; // if less than 30 then the text will be red
   }

   else {
     return false; // Replace with your green text class
   }
 }


// function for comparing today date with the expiry date for green adn red color
compareDate (expiryDate: string) : boolean
   {
      const currentDate = new Date();
      const expiryDateObj = new Date(expiryDate); // Parse the input string to a Date object

      // Add 10 days to the current date
      const currentDatePlus30Days = new Date(currentDate);
      currentDatePlus30Days.setDate(currentDatePlus30Days.getDate() + 30);

      if (expiryDateObj <= currentDatePlus30Days) {
        return true; // Replace with your red text class
      }

      else {
        return false; // Replace with your green text class
      }
    }


// function for routing
moveToRoute(route:string){
      this.router.navigate([route]).then(() => window.scrollTo(0,0));
    }


// function for editing the selected item
moveToRouteWithIndex(route:string, id:number){
  this.router.navigate( [route], { queryParams: { id: id } }).then(() => window.scrollTo(0,0));
}

// function for deleting the selected item
deleteMedicine(index: number): void {
  if (index >= 0 ) {

    this.clickedRowIndex = index;
    this.showProgressBar = true;

  this.medicinsService.DeleteMedById(this.products[index].id).subscribe({
    next:(response:any) => {
      this.products.splice(index, 1);
      this.showProgressBar = false;
    },
    error:(error:any) => {
      this.showProgressBar = false;
    },

    complete:()=>{}
  })
  }
}

// this.clickedRowIndex = index;
//   this.showProgressBar = true;
//   this.userService.deleteUserById(id).subscribe(
//     {
//       next:(response:any) => {
//         this.showProgressBar = false;
//         this.users = this.users.filter((user:any) => user.id != id)
//       },
//       error:(error:any) => {
//         this.showProgressBar = false;
//         this.error = error
//       },
//       complete:() => {}
//     }
//   )

@Input () MainQuantity:MainQty[] =[]
@Output() eventQty = new EventEmitter<MainQty[]> 

public getMedicinsPerPage(pageNumber:number){

  this.medicinsService.getMedicinesPerPage(pageNumber).subscribe({
  
    next:(response:any) => {
   
      this.products = response.data.first;

    for( let i =0; i< this.products.length; i++)
    {let mainQty = {id: this.products[i].id, qty: this.products[i].quantity}
       this.MainQuantity.push(mainQty);
       this.eventQty.emit(this.MainQuantity);
  }
       
      this.products = this.products.filter((value: any) => {
        const existsInTempArray = this.tempArray.some((tempItem: any) => tempItem.id === value.id);
        return !existsInTempArray;
      });

      this.allproductsLength = response.data.second;

      // Assign the filtered products to pagedProducts
      this.pagedProducts = this.products;
      this.showProgressBar=false;

    },
    
    error:(error:any) => {

    },

    complete:()=>{}
  })
}

// public hasZeroQuantityProduct(): boolean {
//   return this.pagedProducts.some(product => product.quantity === 0);
// }





currentPageEvent($event: number) {
  this.getMedicinsPerPage($event+1)
}


//sorting items depending on the date
sortProductsByExpiryDate() {
    this.isAscendingSort = !this.isAscendingSort;

    this.products.sort((a,b) => {
      const dateA = new Date(a.expiryDate);
      const dateB = new Date(b.expiryDate);

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

//sorting items depending on the quantity
sortProductsByQuantity() {
      this.isAscendingSort = !this.isAscendingSort;

      this.products.sort((a, b) => {
        if (this.isAscendingSort) {
          return a.quantity - b.quantity;
        } else {
          return b.quantity - a.quantity;
        }
      });
    }




getLimitedProducts(): any[] {
  return this.pagedProducts.slice(0, this.limit);
}

onDataPerPageReceived(data:any[]){
      this.pagedProducts = data;
  }

// MedicinesInBag :{   id : number;
//                         name : string;
//                         category : string;
//                         location : string;
//                         variants : string;
//                         description : string;
//                         expiryDate : string;
//                         quantity : number;} [] = [];

MedicinesInBag : any [] = [];
addedMedNotSaved : any [] =[];

//  public SavedOrNot(saved : boolean){
//   //  this.mess
//  }


    // Function to update desired quantity for a specific index
updateDesiredQuantity(index: number, quantity: number) {
      this.desiredQuantities[index] =  this.desiredQuantities[index] + quantity;
}


//this is the value of the desired quantity with the addition
@Input () temparrayy:tempA[] =[]
@Input() tempArray:any [] = [];
//This if for the tem array 
@Output() event = new EventEmitter<tempA[]> 



addedMedicines (index : number, quantity : number, desiredQuantity: number = 1){
  this.addedMedNotSaved = []
  let Med = this.products[index];
  if (this.desiredQuantities[index] == null || this.desiredQuantities[index] == undefined){
              this.desiredQuantities[index] = desiredQuantity;
              // this.updateDesiredQuantity(index, 1);
     Med.quantity = quantity - this.desiredQuantities[index];
     // Call the method to navigate to the pull page
       let MedicineToADD = { // getting the selected medicine Info
         id: Med.id,
         name: Med.name,
         category : Med.category,
         location : Med.location,
         variants : Med.variants,
         description : Med.notes,
         expiryDate : Med.expiryDate,
         quantity : Med.quantity,
         allQty: quantity,
         desiredQuantity: this.desiredQuantities[index]  ,// Include the desired quantity
         showDetails: false
       };
       let temp = {id: Med.id, qty: this.desiredQuantities[index] }
         this.addedMedNotSaved.push(MedicineToADD);
         this.output.emit(this.addedMedNotSaved);
         console.log(this.output)
         this.temparrayy.push(temp);
         this.event.emit(this.temparrayy);
         // this.GoToPullPage();
         this.desiredQuantities[index] = Number.NaN;
     }
  else if( (this.desiredQuantities[index]>0 && this.desiredQuantities[index] <= this.products[index].quantity))
  {
    Med.quantity = quantity - this.desiredQuantities[index];
          //if already exist --> remove --> then add again
    const indexToadd = this.temparrayy.findIndex(item => item.id === Med.id);
    let qty ;
    if (indexToadd != -1) {
     qty = this.temparrayy[indexToadd].qty + desiredQuantity;
      console.log();
      // this.addedMedNotSaved.splice(indexToadd, 1);
      this.temparrayy.splice(indexToadd, 1)
      let temp = {id: Med.id, qty: qty}
       this.temparrayy.push(temp);
    }
    else {
      qty = this.desiredQuantities[index];
      let temp = {id: Med.id, qty: qty };
      this.temparrayy.push(temp);
    }
    let MedicineToADD = { // getting the selected medicine Info
      id: Med.id,
      name: Med.name,
      category : Med.category,
      location : Med.location,
      variants : Med.variants,
      description : Med.notes,
      expiryDate : Med.expiryDate,
      quantity : Med.quantity,
      desiredQuantity: qty ,// Include the desired quantity
      showDetails: false,
      allQty: quantity,

    };
    // const index2 = this.addedMedNotSaved.findIndex(item => item.id === MedicineToADD.id);
    console.log(indexToadd);
    console.log(this.temparrayy[indexToadd])
    this.addedMedNotSaved.push(MedicineToADD);
    this.output.emit(this.addedMedNotSaved);
    this.event.emit(this.temparrayy);
    this.desiredQuantities[index] = Number.NaN;
    }
  }

    // Initialize desiredQuantities array based on the number of products
initializeDesiredQuantities() {
      this.desiredQuantities = [];
      for (let i = 0; i < this.products.length; i++) {
        this.desiredQuantities.push(1);
      }
    }



PullMed(index: number, desiredQuantity: number) {

  let Med = this.products[index];

     if (this.desiredQuantities[index] == null){

        this.desiredQuantities[index] = 0;
        this.updateDesiredQuantity(index, 1);

        Med.quantity = Med.quantity - this.desiredQuantities[index];

       let MedicineToBag = { // getting the selected medicine Info
         id: Med.id,
         name: Med.name,
         category: Med.category,
         location: Med.location,
         variants: Med.variants,
         description: Med.description,
         expiryDate: Med.expiryDate,
         quantity: Med.quantity,
         desiredQuantity: this.desiredQuantities[index],// Include the desired quantity
         showDetails: false
       };

       this.MedicinesInBag.push(MedicineToBag);
       // this.output.emit(this.MedicinesInBag);
  
       this.navigateToPullPage();
}

    else{
      Med.quantity = Med.quantity - this.desiredQuantities[index];
       // Call the method to navigate to the pull page

      let MedicineToBag = { // getting the selected medicine Info
        id: Med.id,
        name: Med.name,
        category: Med.category,
        location: Med.location,
        variants: Med.variants,
        description: Med.description,
        expiryDate: Med.expiryDate,
        quantity: Med.quantity ,
        desiredQuantity: this.desiredQuantities[index] ,// Include the desired quantity
        showDetails: false
      };

      this.MedicinesInBag.push(MedicineToBag);
      // this.output.emit(this.MedicinesInBag);

      this.navigateToPullPage();

    }
    }


//  updateQty(i: number, qty : number){;
//    this.products[i].quantity = this.products[i].quantity - qty;
//   }



navigateToPullPage() {
  const navigationExtras: NavigationExtras = {
    state: {
      medicinesInBag: this.MedicinesInBag
    }
  };

  this.router.navigate(['/products/pull'], navigationExtras);
}


searchKeyEvent($event: string) {
  
  this.searchKey = $event;

  if(this.searchKey != ''){
    this.getMedicineBySearchKey(this.searchKey)
  }

  else{
    this.getMedicinsPerPage(1);
  }

}


public getMedicineBySearchKey(searchKey:string){
  this.showProgressBar=true;
  this.limit = 0;

  this.medicinsService.getMedicineBySearchKey(searchKey).subscribe({

        next:(response:any) => {
          this.products = response.data.first;
          this.allproductsLength = response.data.second
          this.pagedProducts= this.products;
          this.limit =10;
          this.showProgressBar=false;
        },

        error:(error:any) => {

        },

        complete:()=>{}
      })
}



ngOnChanges(changes: SimpleChanges): void {
  if (changes['deletedMedFromPull'] && changes['deletedMedFromPull'].currentValue !== changes['deletedMedFromPull'].previousValue ) {
    if(this.searchKey != undefined){
      console.log(this.deletedMedFromPull.id);
      const indexToUpdate = this.products.findIndex(item => item.id === this.deletedMedFromPull.id);
      // const indexToRemove = this.temparrayy.findIndex(item => item.id === indexToUpdate);
      if (indexToUpdate !== -1) {
          for(let i =0; i<this.temparrayy.length; i++){
            if(this.temparrayy[i].id == indexToUpdate)
                this.temparrayy[i].qty =0;
          }
          this.products[indexToUpdate].quantity += this.deletedMedFromPull.qtyDeleted;
      }
      else {
          console.log("Item not found");
      }
    }
    else{
      // this.getConsumerPerPage(1);
    }
  }
}





}

