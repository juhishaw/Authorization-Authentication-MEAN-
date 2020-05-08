import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*Material Imports & Modules*/
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material/material.module';

/*Components*/
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ConfirmPopupComponent } from './components/confirm-popup/confirm-popup.component'
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ProfileWidgetComponent } from './components/profile-widget/profile-widget.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ConfirmPopupComponent,
    SnackBarComponent,
    ProfileWidgetComponent
  ],
  imports: [CommonModule, MaterialModule],
  entryComponents: [ConfirmPopupComponent, SnackBarComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  exports: [HeaderComponent, SidebarComponent, ProfileWidgetComponent]
})
export class SharedHomeModule {}
