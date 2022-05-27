import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DeliveryaddressRoutingModule } from './deliveryaddress-routing.module';
import { DeliveryaddressComponent } from './deliveryaddress.component';


@NgModule({
  declarations: [
    DeliveryaddressComponent
  ],
  imports: [
    CommonModule,
    DeliveryaddressRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DeliveryaddressModule { }
