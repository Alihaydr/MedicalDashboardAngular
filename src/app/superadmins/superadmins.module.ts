import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminsRoutingModule } from './superadmins-routing.module';
import { EdituserComponent } from './edituser/edituser.component';
import { PagingComponent } from '../shared-module/paging/paging.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { FirstSectionComponent } from '../first-section/first-section.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";


@NgModule({
  declarations: [
    SuperAdminComponent,
    EdituserComponent,
    // PagingComponent,

  ],
  imports: [
    CommonModule,
    SuperadminsRoutingModule,
    SharedModuleModule,
    FormsModule,
    MatProgressBarModule,
  ],

  exports:[

  ],
})
export class SuperadminsModule { }
