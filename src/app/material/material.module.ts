import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatButtonModule, MatInputModule, MatDialogModule],
  exports: [MatButtonModule, MatInputModule, MatDialogModule],
})
export class MaterialModule {}
