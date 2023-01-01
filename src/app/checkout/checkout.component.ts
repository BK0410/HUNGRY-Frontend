import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {

    var token:any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    //(base64Payload)
    var payload1:any = Buffer.from(base64Payload, 'base64');
    //(JSON.parse(payload1))
    if(JSON.parse(payload1).role === "ADMIN"){
      this.router.navigate(['not-found'])
    }

  }

}
