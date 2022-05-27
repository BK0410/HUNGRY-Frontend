import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArabianComponent } from './arabian.component';

const routes: Routes = [{ path: '', component: ArabianComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArabianRoutingModule { }
