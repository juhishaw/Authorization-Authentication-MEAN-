import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { FiveHundreadComponent } from './five-hundread/five-hundread.component';


const routes: Routes = [
  {
    path: '404',
    component: FourOFourComponent
  },
  {
    path: '500',
    component: FiveHundreadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
