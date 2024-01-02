import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { PushproductsComponent } from './pushproducts/pushproducts.component';
import { PullproductsComponent } from './pullproducts/pullproducts.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsumersPullComponent } from './consumers-pull/consumers-pull.component';
import { UpdateMedicineComponent } from './update-medicine/update-medicine.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AllproductsComponent,
    PushproductsComponent,
    PullproductsComponent,
    ConsumersPullComponent,
    UpdateMedicineComponent
  ],
  imports: [
    SharedModuleModule,
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class ProductsModule { }
