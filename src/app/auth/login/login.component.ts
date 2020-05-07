import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/home/shared-home/home-utils/utils';
import { RouteConstants } from 'src/app/core/constants/route.constants';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoaderActive = false;
  hide = true;
  currentApplicationVersion = environment.appVersion;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  loginUser() {
    this.startLoading();
    const subscription = this.auth.loginUser(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate([RouteConstants.DASHBOARD]);
      },
      (error) => console.log(error)
    );
    subscription.add(() => this.stopLoading());
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Utils.emptySpaceValidator(), Validators.email]],
      password: [null, [Validators.required, Utils.emptySpaceValidator()]],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  startLoading() {
    this.isLoaderActive = true;
  }
  stopLoading() {
    this.isLoaderActive = false;
  }

  redirectToForgotPassword() {
    this.router.navigate([RouteConstants.FORGOT_PASSWORD]);
  }
}
