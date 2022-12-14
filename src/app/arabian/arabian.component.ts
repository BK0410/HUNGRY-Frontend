import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-arabian',
  templateUrl: './arabian.component.html',
  styleUrls: ['./arabian.component.css']
})
export class ArabianComponent implements OnInit {

  public count: any = 0;
  public categories: any;
  public searchText: any = ''
  public menudisplay = false
  constructor(private userSer: BackendService, private router: Router) { }

  ngOnInit(): void {
    var token:any = localStorage.getItem('token');
    var base64Payload = token.split('.')[1];
    //.log(base64Payload)
    var payload1:any = Buffer.from(base64Payload, 'base64');
    //.log(JSON.parse(payload1))
    if(JSON.parse(payload1).role === "ADMIN"){
      this.router.navigate(['not-found'])
    }
    
    this.userSer.getFoodTable().subscribe((res) => {
      //.log(res, "res==>");
      this.categories = res
    })

    this.userSer.getSingleUser().subscribe((res) => {
      this.count = Object.keys(res.cart).length
    })
  }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  addToCart(dish: string, price: any, restaurant: any) {
    this.count = this.count + 1;
    this.userSer.getSingleUser().subscribe((res) => {
      var cart = new Map<string, any>();
      //.log(cart)
      //.log(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      //.log(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, price * (value + 1), restaurant])
        localStorage.setItem(dish, [value + 1, price + price].toString());
      }
      else {
        cart.set(dish, [1, price, restaurant])
        //.log("new obj")
      }
      //.log(cart)
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addToCart({ cart: jsonObject }).subscribe((res) => {
        var count = Object.keys(jsonObject).length;
        // alert("Dish added to Cart successfully")
      })
    })

  }
}
