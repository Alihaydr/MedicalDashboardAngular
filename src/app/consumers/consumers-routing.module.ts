import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllconsumerComponent } from './allconsumer/allconsumer.component';
import { AddconsumerComponent } from './addconsumer/addconsumer.component';
import { UpdateConsumerComponent } from './update-consumer/update-consumer.component';

const routes: Routes = [
  {path:'all', component:AllconsumerComponent},
  {path:'new', component:AddconsumerComponent},
  {path:'update-consumer', component:UpdateConsumerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumersRoutingModule { }
