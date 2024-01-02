import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ConsumerTransaction, ItemTransaction, MainQty, TransactionPull, tempA } from 'src/app/classes';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-pullproducts',
  templateUrl: './pullproducts.component.html',
  styleUrls: ['./pullproducts.component.css']
})


export class PullproductsComponent implements OnInit{

  private clickNewConsumerButton: boolean = false;

  //this medicince bag is filled with the pulled product from dashboard
  MedicinesBag : any [] = [];

 //empty the medicince bag which is filled with addeds products from dashboard
 //if the user pressed x and didn't save the changes
  EmptyMedBag : any [] = [];

//this medicince bag is filled with the added products and not saved
  AddedMedicin : any [] = []

  id : number = -1;

  showSection : boolean = true;
  showDetails: boolean = false;

  //for the temp array
arrayTEMP:number []=[];


  savedChanges : boolean = false;

  productId:string | null= "";
  phoneNumberSearchKey:string = "";
  consumerId:number = 0;
  report:File | null = null;
  reportFileName:string = "";

  itemTransactions:ItemTransaction[] =[];
  isSomethingEmpty:boolean = false;

  openModal:boolean = false;

  showProgressBar:boolean = false;
  message:string = ""
  error:string = ""

//this is for the max qty to pull
  maxQtyAllowed: number = 0;


constructor(private route: ActivatedRoute, private router:Router, private transactionService:TransactionsService){

const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const medicinesInBag = navigation?.extras?.state['medicinesInBag'];
      this.MedicinesBag = medicinesInBag
    }
  }


addNewMedButtonClicked(){
    this.openModal=true;
  }

  ngOnInit(): void {
    let consumerItemsSaved = localStorage.getItem("items")
    if(consumerItemsSaved != null){
      this.MedicinesBag = JSON.parse(consumerItemsSaved)
    }
  }

  ngOnDestroy(): void {
    if(!this.clickNewConsumerButton){
      localStorage.removeItem("items")
    }
}

saveChanges(){
  this.savedChanges = true;
  this.BAGofMedAddedCombination(this.AddedMedicin);
  this.openModal = false;
  localStorage.setItem("items", JSON.stringify(this.MedicinesBag))
  this.AddedMedicin = []
}



  //this is the array where i am storing the desired data when adding
  temp:tempA[] = [];
  mainQtyArray: MainQty[]=[];

    //this is the output --> for the desired data stored
catchDesiredArray($event: tempA[]) {
    console.log($event)
     this.temp = $event;
  }

  catchMainQtyArray($event: MainQty[]) {
    console.log($event)
     this.mainQtyArray = $event;
  }



toggleDetails(index: number) {
    this.MedicinesBag[index].showDetails = !this.MedicinesBag[index].showDetails;
  }

closeDetails() {
    // Implement your logic here, for example:
    this.showDetails = false;
  }




// clearButton(_t39: number) {  }


insertProduct() {
  this.error = ""
  this.message = ""
    this.MedicinesBag.forEach((e) => {
      this.itemTransactions.push(new ItemTransaction(e.id, e.name,e.desiredQuantity))
    })
  if(this.reportFileName == '' || this.itemTransactions.length == 0 || this.consumerId == 0){
    this.isSomethingEmpty = true;
    return
  }
  let pull = new TransactionPull(0,
                          this.itemTransactions,
                          new ConsumerTransaction(this.consumerId),
                          "pull",
                          "",
                          "link"
    );
    this.showProgressBar = true;
  this.transactionService.pullTransaction(pull, this.report).subscribe({
    next:(response:any) => {
      this.error = "";
      this.message = response.data;
      this.showProgressBar = false;
      this.MedicinesBag = [];
      this.itemTransactions = [];
    },
    error:(error:any) => {
      this.message = ""
      this.error = error;
      this.showProgressBar = false;
      this.itemTransactions = [];
    },
    complete:() => {
      localStorage.removeItem("items")
    }
  })
}

isRemoved:boolean = false;

//save changes btn

//close btn
unSaveChanges(){
  this.savedChanges = false;
    for(let i =0; i <this.AddedMedicin.length && this.temp.length; i++){
          this.AddedMedicin.splice(i);
          this.AddedMedicin.splice(i, 1);
  }
  for(let i =0; i <this.temp.length && this.temp.length; i++){
    this.temp.splice(i);
    this.temp.splice(i, 1);
}
  this.openModal = false;
  this.catchDesiredArray(this.temp);
}

deletedMed : any ;
foundItem: any;
//inside the modal
deleteMedicine(index: number): void {
  // target Id is the id of the medicine
  const targetId = this.AddedMedicin[index].id;
  // console.log("id of the med "+targetId);
  this.deletedMed ={ id: targetId ,  qtyDeleted: this.AddedMedicin[index].desiredQuantity }
   this.foundItem = this.temp.find(item => item.id==targetId);
  if (this.foundItem?.id !== -1) {
    // foundItem?.qty = 0;
    console.log("Item desired Qty found:", this.foundItem.qty);
    this.AddedMedicin[index].desiredQuantity = 0;
    this.AddedMedicin.splice(index, 1);
    this.foundItem.qty = 0;
    this.temp.splice(targetId, 1);
}
  else {
    console.log("Item not found.");
    console.log("--------------------");
  }
}

deleteMedicineBag(index: number): void {
  const targetId = this.MedicinesBag[index].id;
  this.foundItem = this.temp.find(item => item.id==targetId);
    this.MedicinesBag[index].desiredQuantity = 0;
    this.MedicinesBag.splice(index, 1);
    this.foundItem.qty = 0;
    this.temp.splice(targetId, 1);
    localStorage.setItem("items", JSON.stringify(this.MedicinesBag))
}

goToAddConsumerPage() {
  this.clickNewConsumerButton = true;
  localStorage.setItem('AddNewConsumer', 'FromPull');
  this.router.navigate(['/consumers/new']).then(() => window.scrollTo(0,0));
}


  //here i am catching the output
//medicine bag in --> added meds but not saved yet

public BAGofMed(MedicinesBagIn: any[]) {
    // Combine the existing AddedMedicin array with the MedicinesBagIn array
    const combinedMedicines = [...this.AddedMedicin, ...MedicinesBagIn];
  
    // Create a new Map to store unique medicines based on their 'id'
    const uniqueMedicinesMap = new Map();
    for (const medicine of combinedMedicines) {
      // Use the medicine's 'id' as the key in the Map to ensure uniqueness
      uniqueMedicinesMap.set(medicine.id, medicine);
    }
  
    // Convert the values of the Map back to an array to get unique medicines
    this.AddedMedicin = Array.from(uniqueMedicinesMap.values());
  
    // Clear the MedicinesBagIn array
    MedicinesBagIn = [];
  }


public BAGofMedAddedCombination(MedicinesBagIn: any[]) {

    const combinedMedicines = [...this.MedicinesBag, ...MedicinesBagIn];
    const uniqueIds = new Set(combinedMedicines.map((medicine) => medicine.id));

      this.MedicinesBag = Array.from(uniqueIds).map((id) =>
      combinedMedicines.find((medicine) => medicine.id === id)
    );
    MedicinesBagIn = [];
  }



 // medicines array
 products: any[] = [];


handleFileInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const selectedFile = inputElement.files ? inputElement.files[0] : null;

  if (selectedFile) {
    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop()!.toLowerCase();

    // Check file extension
    if (fileExtension === 'pdf' || fileExtension === 'docx' || fileExtension === 'jpeg' || fileExtension === 'png') {
        this.report = selectedFile;
        this.reportFileName = fileName;

  }else{
    this.report = null;
  }
}
}



searchKeyEvent($event: string) {
    this.phoneNumberSearchKey = $event
  }

public consumerIdEvent($event:number){
    this.consumerId = $event;
  }



    
}
