import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsComponentComponent} from "./products-component/products-component.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConsumerComponent } from './consumer/consumer.component';
import { SearchbuttonComponent } from './searchbutton/searchbutton.component';
import { PagingComponent } from './paging/paging.component';
import { FirstSectionComponent } from '../first-section/first-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionComponentComponent } from './transaction-component/transaction-component.component';
import { PullproductsComponent } from '../products/pullproducts/pullproducts.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { tempA } from '../classes';

@NgModule({
  declarations: [
    ProductsComponentComponent,
    ConsumerComponent,
    SearchbuttonComponent,
    PagingComponent,
    FirstSectionComponent,
    TransactionComponentComponent,
  ],

  exports:[
    ProductsComponentComponent,
    ConsumerComponent,
    SearchbuttonComponent,
    FirstSectionComponent,
    TransactionComponentComponent,
    PagingComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule, 
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,

  ]
})

export class SharedModuleModule { }
