import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-searchbutton',
  templateUrl: './searchbutton.component.html',
  styleUrls: ['./searchbutton.component.css']
})
export class SearchbuttonComponent {

  @Output() searchKey = new EventEmitter<string>

  searchQuery: string = '';

  myForm: FormGroup;

  constructor(private fb: UntypedFormBuilder){
    this.myForm  = this.fb.group({
      searchKey: [''],
    });

    this.myForm.get('searchKey')?.valueChanges
    .pipe(debounceTime(1000)) 
    .subscribe((searchValue: string) => {
      this.searchKey.emit(searchValue);
    });
  }

  // onSearchKeyInput() {
  //   const searchKey = this.myForm.get('searchKey')?.value;
  //   this.searchKey.emit(searchKey);
  // }

}
