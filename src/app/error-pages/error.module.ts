import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { FiveHundreadComponent } from './five-hundread/five-hundread.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';


@NgModule({
  declarations: [FiveHundreadComponent, FourOFourComponent],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
