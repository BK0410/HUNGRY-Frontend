import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ItalianRoutingModule } from './italian-routing.module';
import { ItalianComponent } from './italian.component';


@NgModule({
  declarations: [
    ItalianComponent
  ],
  imports: [
    CommonModule,
    ItalianRoutingModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class ItalianModule { }
