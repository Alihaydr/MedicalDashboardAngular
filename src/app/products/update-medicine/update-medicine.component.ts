import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Item } from 'src/app/classes';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit{

  myForm: FormGroup;

  i : number = 0;

  //item i want to edit
  item:Item = new Item();

  messageDosageEmpty:boolean= false;
  isSomethingEmpty: boolean = false;
  messageCategoryEmpty:boolean = false;
  dosageAlreadyExist:boolean = false;
  categoryAleadyExist: boolean = false;

  allCategoris:Category[] = [];
  showProgressBar:boolean = false;
  message:string = ""
  error:string = ""

  // dosages: string[] = [];
  categories:Category [] =[];

constructor(private service: ProductsService,private fb: UntypedFormBuilder, private route: ActivatedRoute){

  this.myForm  = this.fb.group({
    name: ['',Validators.required],
    description: ['',Validators.required],
    variants: ['',Validators.required],
    quantity: ['',Validators.required],
    category:  ['', Validators.required],
    itemValidity: [0],
    expirationDate: ['',Validators.required],
    location: ['',Validators.required],
    variant: ['', Validators.required],
    unit: ['mg', Validators.required]
  });
}


ngOnInit(): void {

  this.route.queryParams.subscribe(params => {
    const productid = params['id'];
    this.getProductByID(productid);
  })

     this.getCategories();
  // this.service.GetMedById();
}



selectedDosage: string = '';
selectedUnit: string = 'mg';
// dosages: { value: string, unit: string }[] = [];


EditMedicine(){
  this.error = "";
  this.message = "";

  this.item.categories = this.categories;
  this.item.variants = this.item.variants;

  if(this.item.name == ''
    // || this.item.location == '' || this.item.notes == ''|| this.item.itemValidity == 0 ||
    //   this.item.quantity == 0
      || this.item.variants?.length == 0
      // || this.item.categories?.length == 0
      )
  {
    this.isSomethingEmpty = true;
    return
  }

  this.showProgressBar = true;
  this.service.updateMedicine(this.item).subscribe({
    next:(response:any) => {
            this.error = "";
            this.message = response.data;
            this.showProgressBar = false;
            this.myForm.reset();
            this.isSomethingEmpty = false
            this.item.categories = []
            this.item.variants = []
    },
    error:(error:any) => {
      this.error = error;
      this.showProgressBar = false;
    },
    complete:() => {}
  });

}


getProductByID(id : number){
  this.service.GetMedById(id).subscribe({

    next:(response:any) => { this.item = response.data;

      this.myForm.setValue({
        'name': this.item.name,
        'description': this.item.notes,
        'variants': '',
        'quantity': this.item.quantity,
        'category': this.item.categories,
        'itemValidity': this.item.itemValidity,
        'expirationDate': this.item.expiryDate,
        'location': this.item.location,
        'variant': this.item.variants,
        'unit': '',
      })
    },

    error:(error:any) => {},

    complete:() => {}
  })
}


addDosage() {
    this.dosageAlreadyExist = false;
    this.messageDosageEmpty = false;
    let selectedDosage = this.myForm.get('variant')?.value;
    let selectedUnit = this.myForm.get('unit')?.value

    if (selectedDosage !== '' && selectedUnit !== '') {
      const dosage = selectedDosage + selectedUnit

      if(this.item.variants!.length != 0){
        this.dosageAlreadyExist = false;

        for (const element of this.item.variants!) {
            if (element === dosage) {
                this.dosageAlreadyExist = true;
                break;
            }
        }

        if (!this.dosageAlreadyExist) {
            this.item.variants!.push(dosage);
            this.myForm.get('variant')?.setValue('');
            this.messageDosageEmpty = false;
        }
      }else{
        this.dosageAlreadyExist = false;
        this.item.variants!.push(dosage);
        this.myForm.get('variant')?.setValue('');
        this.messageDosageEmpty = false;
      }



    }
    else{
      this.messageDosageEmpty = true;
    }
  }


addCategory() {

    this.messageCategoryEmpty = false;
    this.categoryAleadyExist = false;


    const selectedCategoryId = this.myForm.get('category')?.value;
    const selectedCategory = this.allCategoris.find(category => category.id === Number(selectedCategoryId));

    if (selectedCategory ) {
      if(!this.isCategoryAlreadySelected(selectedCategory)){
        this.categories.push(selectedCategory);
        this.myForm.get('category')?.setValue(''); // Reset the select field
      }else{
        this.categoryAleadyExist = true;
      }
    }else{
      this.messageCategoryEmpty = true
    }
  }

isCategoryAlreadySelected(category: Category): boolean {
    return this.categories.some(
      selected => selected.id === category.id && selected.category === category.category
    );
  }

clearButton(index: number): void {
    if (index >= 0 && index < this.item.variants!.length) {
      this.item.variants!.splice(index, 1);
    }
  }

clearButtonCategory(index: number): void {
    if (index >= 0 && index < this.categories.length) {
      this.categories.splice(index, 1);
    }
  }


onFieldChange(fieldName: string, value: string) {
    this.item![fieldName] = value
  }


public getCategories(){
    
  this.service.getCategories().subscribe({
      next:(response:any) => { this.allCategoris = response.data; },
      error:(error:any) => {},
      complete:() => {}
    })
  }


}
