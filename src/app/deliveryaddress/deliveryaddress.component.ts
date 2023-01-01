import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-deliveryaddress',
  templateUrl: './deliveryaddress.component.html',
  styleUrls: ['./deliveryaddress.component.css']
})
export class DeliveryaddressComponent implements OnInit {

  constructor(private userSer: BackendService,private router: Router,private router2:ActivatedRoute) { }

  getParamid: any;
  public user: any;
  public count:any = 0;
  public tokendisplay = true
  public menudisplay = false

  ngOnInit(): void {

    var token: any = localStorage.getItem('token');
    var refreshToken:any = localStorage.getItem('refreshToken')
    var base64Payload = token.split('.')[1];
    //(base64Payload)
    var payload1: any = Buffer.from(base64Payload, 'base64');
    //(JSON.parse(payload1))
    if (JSON.parse(payload1).role === "ADMIN") {
      this.router.navigate(['not-found'])
    }

    const { exp } = JSON.parse(payload1);
    const expired = Date.now() >= exp * 1000
    //("________" + expired)

    if(expired == true){
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID,refreshToken).subscribe((res)=>{
        //("+++++++++++++" + res.token)
        localStorage.setItem('token',res.token)
        window.location.reload()
      })
    }
    
    this.userSer.getSingleUser().subscribe((res) => {
      //(res, "res==>");
      this.user = res
      //(res)
    })

    this.userSer.getSingleUser().subscribe((res) => {
      this.count = Object.keys(res.cart).length
    })
    
  }

  addressForm = new FormGroup({
    'Address_Line1': new FormControl('',Validators.required),
    'Address_Line2': new FormControl('',Validators.required),
    'Landmark': new FormControl('',Validators.required),
    'City_Pincode': new FormControl('',Validators.required)
  });

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  address(){
    if (this.addressForm.valid) {
      this.userSer.address(this.addressForm.value).subscribe((res) => {
        alert("Delivery Address Saved successfully")
        this.addressForm.reset();
        this.router.navigate(['/userPage']);
      })
    }
    else {
      alert("All fields are required");
    }
  }
}
