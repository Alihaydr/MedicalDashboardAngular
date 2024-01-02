import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

// import { TransactionComponent } from './transaction/transaction.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SecondSectionComponent } from './second-section/second-section.component';
import { ThirdSectionComponent } from './third-section/third-section.component';
//import { SectionFourComponent } from './section-four/section-four.component';
// import { SectionFiveComponent } from './section-five/section-five.component';
import { SectionSixComponent } from './section-six/section-six.component';
import {SharedModuleModule} from "../shared-module/shared-module.module";
import { HomeComponent } from './home/home.component';
import { LoadingComponent } from '../loading/loading.component';


@NgModule({
  declarations: [
  HomeComponent,
    MainPageComponent,
    SecondSectionComponent,
    ThirdSectionComponent,
    SectionSixComponent,
    LoadingComponent
  ],

  imports: [
    SharedModuleModule,
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
