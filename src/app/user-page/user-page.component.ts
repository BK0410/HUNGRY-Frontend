import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  public count: any = 0;
  public categories: any;
  public tokendisplay = true;
  public searchText: any = ''
  public menudisplay = false
  constructor(private userSer: BackendService, private router: Router) { }

  ngOnInit(): void {
    var token: any = localStorage.getItem('token');
    var refreshToken:any = localStorage.getItem('refreshToken')
    var base64Payload = token.split('.')[1];
    console.log(base64Payload)
    var payload1: any = Buffer.from(base64Payload, 'base64');
    console.log(JSON.parse(payload1))
    if (JSON.parse(payload1).role === "ADMIN") {
      this.router.navigate(['not-found'])
    }

    const { exp } = JSON.parse(payload1);
    const expired = Date.now() >= exp * 1000
    console.log("________" + expired)

    if(expired == true){
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID,refreshToken).subscribe((res)=>{
        console.log("+++++++++++++" + res.token)
        localStorage.setItem('token',res.token)
        window.location.reload()
      })
    }
    
    this.userSer.getCategories().subscribe((res) => {
      console.log(res, "res==>");
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

  addToCart(dish: string, price: any) {
    this.userSer.getSingleUser().subscribe((res) => {
      var cart = new Map<string, any>();
      console.log(cart)
      console.log(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      console.log(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, price + price])
        localStorage.setItem(dish, [value + 1, price + price].toString());
      }
      else {
        cart.set(dish, [1, price])
        localStorage.setItem(dish, [1, price].toString());
        console.log("new obj")
      }
      console.log(cart)
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addToCart({ cart: jsonObject }).subscribe((res) => {
        var count = Object.keys(jsonObject).length;
        alert("Dish added to Cart successfully")
      })
    })

  }
}
