import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedHomeRoutingModule } from './shared-home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmPopupComponent, SnackBarComponent],
  imports: [CommonModule, SharedHomeRoutingModule, MaterialModule],
  entryComponents: [ConfirmPopupComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class SharedHomeModule {}
