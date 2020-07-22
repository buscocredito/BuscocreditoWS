import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//-------------------ANGULAR MATERIAL---------------------------------------------

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';



//--------------------------------------------------------------------------------

const myModule = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatSelectModule
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModule
  ],
  exports: [myModule]
})
export class MaterialModule { }
