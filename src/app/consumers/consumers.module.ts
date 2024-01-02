import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { AllconsumerComponent } from './allconsumer/allconsumer.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddconsumerComponent } from './addconsumer/addconsumer.component';
import { UpdateConsumerComponent } from './update-consumer/update-consumer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    AllconsumerComponent,
    AddconsumerComponent,
    UpdateConsumerComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FormsModule
  ]
})
export class ConsumersModule {

  item_active: string = "consumers";

 }
