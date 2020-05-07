import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedHomeRoutingModule } from './shared-home-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ConfirmPopupComponent],
  imports: [CommonModule, SharedHomeRoutingModule, MaterialModule],
  entryComponents: [ConfirmPopupComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
  ],
})
export class SharedHomeModule {}
