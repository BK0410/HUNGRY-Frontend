import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChineseRoutingModule } from './chinese-routing.module';
import { ChineseComponent } from './chinese.component';


@NgModule({
  declarations: [
    ChineseComponent
  ],
  imports: [
    CommonModule,
    ChineseRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class ChineseModule { }
