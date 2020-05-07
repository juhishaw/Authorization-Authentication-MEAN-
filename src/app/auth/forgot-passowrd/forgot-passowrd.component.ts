import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/home/shared-home/components/confirm-popup/confirm-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/home/shared-home/home-utils/utils';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/core/constants/route.constants';
@Component({
  selector: 'app-forgot-passowrd',
  templateUrl: './forgot-passowrd.component.html',
  styleUrls: ['./forgot-passowrd.component.scss']
})
export class ForgotPassowrdComponent implements OnInit {
  isLoaderActive = false;
  email: string;
  confirmEmailForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initConfirmEmailForm();
  }

  startLoading() {
    this.isLoaderActive = true;
  }
  stopLoading() {
    this.isLoaderActive = false;
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '440px',
      data: {
        title: 'Please check your email',
        subTitle:
          'A password reset link has been sent to your inbox. Please follow the instructions on the email to reset your password.',
        btnTxt: 'Ok'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authService
        .forgotPassword(this.confirmEmailForm.value)
        .subscribe(response => {
          console.log(response);
          localStorage.setItem('resetPasswordToken', response.data.passwordToken);
          this.router.navigate([RouteConstants.RESET_PASSWORD])
        });
    });
  }

  initConfirmEmailForm() {
    this.confirmEmailForm = this.fb.group({
      email: [
        '',
        [Validators.required, Utils.emptySpaceValidator(), Validators.email]
      ]
    });
  }

  get confirmEmailFormControl() {
    return this.confirmEmailForm.controls;
  }
}
