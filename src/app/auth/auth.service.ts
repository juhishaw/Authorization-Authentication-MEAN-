import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstants } from '../core/constants/route.constants';
import { tap } from 'rxjs/operators';
import { CustomHttpService } from '../core/services/http.service';
import { environment } from '../../environments/environment';
import { ForgotOrResetPassword, User } from '../shared/models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = 'http://localhost:3000/api/login';
  private backendBasedUrl = environment.backendBasedUrl;

  constructor(private http: CustomHttpService, private router: Router) {}

  /*Use model rather than any*/
  loginUser(user) {
    return this.http.post(this._loginUrl, user).pipe(
      tap(response => {
        this.saveAuthTokens(response);
      })
    );
  }

  saveAuthTokens(res) {
    localStorage.setItem('token', res.token);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate([RouteConstants.LOGIN]);
  }

  /*Verify once again*/
  loggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  forgotPassword(email: string) {
    return this.http.post<{
      data: ForgotOrResetPassword;
      message: string;
      status: number;
    }>(`${this.backendBasedUrl}/forgot_password`, email);
  }

  resetPassword(resetPasswordToken: string, newPassword: string) {
    const param = {
      resetPasswordToken,
      newPassword
    };
    return this.http.post<{
      data: ForgotOrResetPassword;
      message: string;
      status: number;
    }>(`${this.backendBasedUrl}/reset_password`, param);
  }
}
