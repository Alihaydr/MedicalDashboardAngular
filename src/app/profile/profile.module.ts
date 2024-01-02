import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MeComponent } from './me/me.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { HeaderComponent } from '../header/header.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MeComponent,
  ],

  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModuleModule,
    FormsModule
  ]
})
export class ProfileModule { }
