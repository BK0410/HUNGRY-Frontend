import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItalianComponent } from './italian.component';

const routes: Routes = [{ path: '', component: ItalianComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItalianRoutingModule { }
