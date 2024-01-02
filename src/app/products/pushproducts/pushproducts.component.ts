import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Category, Item } from 'src/app/classes';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-pushproducts',
  templateUrl: './pushproducts.component.html',
  styleUrls: ['./pushproducts.component.css']
})
export class PushproductsComponent implements OnInit{

  myForm: FormGroup;
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

  constructor(private fb: UntypedFormBuilder, private itemService:ProductsService){
    this.myForm  = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      variants: ['',Validators.required],
      quantity: ['',Validators.required],
      category: [0],
      itemValidity: [0],
      expirationDate: ['',Validators.required],
      location: ['',Validators.required],
      variant: ['', Validators.required],
      unit: ['mg', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getCategories()
  }

  // selectedDosage: string = '';
  // selectedUnit: string = 'mg';
  dosages: string[] = [];
  categories:Category [] =[];

  addDosage() {
    this.dosageAlreadyExist = false;
    this.messageDosageEmpty = false;
    let selectedDosage = this.myForm.get('variant')?.value;
    let selectedUnit = this.myForm.get('unit')?.value

    if (selectedDosage !== '' && selectedUnit !== '') {
      const dosage = selectedDosage + selectedUnit

      if(this.dosages.length != 0){
        this.dosageAlreadyExist = false;

        for (const element of this.dosages) {
            if (element === dosage) {
                this.dosageAlreadyExist = true;
                break;
            }
        }

        if (!this.dosageAlreadyExist) {
            this.dosages.push(dosage);
            this.myForm.get('variant')?.setValue('');
            this.messageDosageEmpty = false;
        }
      }else{
        this.dosageAlreadyExist = false;
        this.dosages.push(dosage);
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
    if (index >= 0 && index < this.dosages.length) {
      this.dosages.splice(index, 1);
    }
  }

  clearButtonCategory(index: number): void {
    if (index >= 0 && index < this.categories.length) {
      this.categories.splice(index, 1);
    }
  }

  insertProduct(){

    this.error = ""
    this.message = ""

    this.item.categories = this.categories;
    this.item.variants = this.dosages;

    if(this.item.name == '' || this.item.location == '' || this.item.notes == ''|| this.item.itemValidity == 0 ||
        this.item.quantity == 0 || this.item.variants?.length == 0 || this.item.categories.length == 0)
    {
      this.isSomethingEmpty = true;
      return
    }

    this.showProgressBar = true;
    this.itemService.addMedicines(this.item).subscribe({
      next:(response:any) => {
        this.error = "";
        this.message = response.data;
        this.showProgressBar = false;
        this.myForm.reset();
        this.isSomethingEmpty = false
        this.categories = []
        this.dosages = []
      },
      error:(error:any) => {
        this.error = error;
        this.showProgressBar = false;
      },
      complete:() => {}
    });

  }



  onFieldChange(fieldName: string, value: string) {
    this.item![fieldName] = value
  }


  public getCategories(){
    this.itemService.getCategories().subscribe({
      next:(response:any) => { this.allCategoris = response.data; },
      error:(error:any) => {},
      complete:() => {}
    })
  }
}
