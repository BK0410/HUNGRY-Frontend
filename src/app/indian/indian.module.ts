import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { IndianRoutingModule } from './indian-routing.module';
import { IndianComponent } from './indian.component';


@NgModule({
  declarations: [
    IndianComponent
  ],
  imports: [
    CommonModule,
    IndianRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class IndianModule { }
