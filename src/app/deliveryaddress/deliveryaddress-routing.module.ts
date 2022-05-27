import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryaddressComponent } from './deliveryaddress.component';

const routes: Routes = [{ path: '', component: DeliveryaddressComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryaddressRoutingModule { }
