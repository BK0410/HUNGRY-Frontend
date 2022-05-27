import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndianComponent } from './indian.component';

const routes: Routes = [{ path: '', component: IndianComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndianRoutingModule { }
