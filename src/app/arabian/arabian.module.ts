import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ArabianRoutingModule } from './arabian-routing.module';
import { ArabianComponent } from './arabian.component';


@NgModule({
  declarations: [
    ArabianComponent
  ],
  imports: [
    CommonModule,
    ArabianRoutingModule,
    Ng2SearchPipeModule,
    FormsModule
  ]
})
export class ArabianModule { }
