import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// advance
import { MultilingualModule } from 'shared/i18n/multilingual.module';

import { HomeComponent } from './home.component';
import { routing } from './home.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MultilingualModule,
    routing
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
