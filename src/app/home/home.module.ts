import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../core/services/token-interceptor.service';
import { CustomHttpService } from '../core/services/http.service';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule],
  providers: [
    CustomHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class HomeModule {}
