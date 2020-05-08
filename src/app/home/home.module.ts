import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/*Modules*/
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedHomeModule } from './shared-home/shared-home.module';

/*Services*/
import { TokenInterceptorService } from '../core/services/token-interceptor.service';
import { CustomHttpService } from '../core/services/http.service';

/*Components*/
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, SharedHomeModule],
  providers: [
    CustomHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ]
})
export class HomeModule {}
