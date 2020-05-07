import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Utils from 'src/app/home/shared-home/home-utils/utils';
import { ConfirmedValidator } from '../../shared/custom-validators/confirmed.validator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from 'src/app/home/shared-home/components/confirm-popup/confirm-popup.component';
import { Router } from '@angular/router';
import { RouteConstants } from 'src/app/core/constants/route.constants';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initResetPasswordForm();
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', [Validators.required, Utils.emptySpaceValidator()]],
        confirm_password: [
          '',
          [Validators.required, Utils.emptySpaceValidator()]
        ]
      },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      }
    );
  }

  get resetPasswordFormControl() {
    return this.resetPasswordForm.controls;
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '440px',
      data: {
        title: 'Your password has been reset',
        subTitle: 'Use your new password to log in to your account',
        btnTxt: 'Log In'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.authService.resetPassword(
        localStorage.getItem('resetPasswordToken'),
        this.resetPasswordForm.controls['confirm_password'].value
      ).subscribe(response => {
        localStorage.removeItem('resetPasswordToken');
        console.log(response);
      })
      this.router.navigate([RouteConstants.LOGIN]);
    });
  }
}
