import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { EdituserComponent } from './edituser/edituser.component';

const routes: Routes = [
 {path:'all', component:SuperAdminComponent},
 {path:'edit', component:EdituserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminsRoutingModule { }
