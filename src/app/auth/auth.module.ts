import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    SignupComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModuleModule,
        FormsModule,
        MatProgressBarModule
    ]
})
export class AuthModule { }
