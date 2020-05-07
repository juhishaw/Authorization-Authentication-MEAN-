import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/*Services*/
import { AuthService } from './auth.service';
import { TokenInterceptorService } from '../core/services/token-interceptor.service';
import { CustomHttpService } from '../core/services/http.service';

/*Modules*/
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';

/*Components*/
import { LoginComponent } from './login/login.component';
import { ForgotPassowrdComponent } from './forgot-passowrd/forgot-passowrd.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, ForgotPassowrdComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    CustomHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class AuthModule {}
