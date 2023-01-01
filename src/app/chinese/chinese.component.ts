import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-chinese',
  templateUrl: './chinese.component.html',
  styleUrls: ['./chinese.component.css']
})
export class ChineseComponent implements OnInit {

  public count: any = 0;
  public categories: any;
  public searchText: any = ''
  public tokendisplay = true
  public menudisplay = false
  constructor(private userSer: BackendService, private router: Router) { }

  ngOnInit(): void {

    var token: any = localStorage.getItem('token');
    var refreshToken: any = localStorage.getItem('refreshToken')
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

    if (expired == true) {
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe((res) => {
        //("+++++++++++++" + res.token)
        localStorage.setItem('token', res.token)
        window.location.reload()
      })
    }

    this.userSer.getFoodTable().subscribe((res) => {
      //(res, "res==>");
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

  reload() {
    window.location.reload()
  }

  addToCart(dish: string, price: any, restaurant: any) {

    var token: any = localStorage.getItem('token');
    var refreshToken: any = localStorage.getItem('refreshToken')
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

    if (expired == true || expired == false) {
      this.tokendisplay = false
      this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe((res) => {
        //("+++++++++++++" + res.token)
        localStorage.setItem('token', res.token)
        // alert("Session restored...Please add the dish to cart once again")
        // window.location.reload()
      })
    }
      this.count = this.count + 1;
    this.userSer.getSingleUser().subscribe((res) => {
      var cart = new Map<string, any>();
      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      //(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, price * (value + 1), restaurant])
      }
      else {
        cart.set(dish, [1, price, restaurant])
        //("new obj")
      }
      //(cart)
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addToCart({ cart: jsonObject }).subscribe((res) => {
        var count = Object.keys(jsonObject).length;
        // window.location.reload()
        // alert("Dish added to Cart successfully")
      })
    })

  }
}
