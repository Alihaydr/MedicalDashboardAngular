import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
//import { AuthGuard } from './auth/auth-guard.guard';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoadingComponent } from './loading/loading.component';
import {AuthGuard} from "./auth/auth-guard.guard";
import {EverythingGuard} from "./auth/everything.guard";


const routes: Routes = [
  {path:'user/signin', component:SigninComponent},
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthGuard]},
  { path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule),
    canActivate: [EverythingGuard]
  },
  { path: 'consumers',
    loadChildren: () => import('./consumers/consumers.module').then(m => m.ConsumersModule),
    canActivate: [EverythingGuard]
  },
  { path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    canActivate: [EverythingGuard]
  },
  { path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [EverythingGuard]
  },
  {path:'invoice' , component:InvoiceComponent},
  {
    path:'SuperAdmin' ,
    loadChildren: () => import('./superadmins/superadmins.module').then(m => m.SuperadminsModule),
    canActivate: [AuthGuard]
  },
  {path:'load', component:LoadingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
