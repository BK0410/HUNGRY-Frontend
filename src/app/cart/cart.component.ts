import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public count: any = 0;
  public categories: any;
  public user: any;
  public searchText: any = ''
  public display = true;
  public keyvalue: any = []
  public totalprice: any = 0;
  public restaurant: any = [];
  public confirmdisplay = true;
  public tokendisplay = true
  public paymentDisplay = false
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
      if (this.count !== 0 || this.count == NaN) {
        this.display = false
      }
      for (let item in res.cart) {
        this.keyvalue.push([item, res.cart[item][0], res.cart[item][1], res.cart[item][2]]);
        if (!this.restaurant.includes(res.cart[item][2])) {
          this.restaurant.push(res.cart[item][2])
        }

        if (this.restaurant.length > 1) {
          this.confirmdisplay = false;
        }
        //("++++++++++++++++++++++++++" + this.restaurant)
        this.totalprice = res.cart[item][1] + this.totalprice
        //(this.totalprice)
      }

      this.user = res


    })
  }


  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  addToCart(dish: string, price: any) {
    var cart = new Map<string, any>();
    this.userSer.getSingleUser().subscribe((res) => {

      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      //(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, price + price])
      }
      else {
        cart.set(dish, [1, price])
        localStorage.setItem(dish, [1, price].toString());
        //("new obj")
      }
      //(cart)
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

  subtract(dish: string, price: any, quantity: any, restaurant: any) {

    var cart = new Map<string, any>();
    this.userSer.getSingleUser().subscribe((res) => {

      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      //(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        if (value !== 1) {
          cart.set(dish, [value - 1, (price / quantity) * (quantity - 1), restaurant])
        }
        else {
          var jsoncart = {}
          this.userSer.getSingleUser().subscribe((res) => {
            //(res, "res==>");
            delete res.cart[dish]
            jsoncart = res.cart;
            this.userSer.addToCart({ cart: jsoncart }).subscribe((res) => {
              //(jsoncart)
            })
            window.location.reload();
          })
          //(jsoncart)

        }
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
        //(cart)
      })

      window.location.reload();
    })


  }

  add(dish: string, price: any, quantity: any, restaurant: any) {

    var cart = new Map<string, any>();
    this.userSer.getSingleUser().subscribe((res) => {

      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      //(cart)


      if (cart.has(dish)) {
        var value: any = cart.get(dish)[0]
        cart.set(dish, [value + 1, (price / quantity) * (quantity + 1), restaurant])
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
        //(cart)
      })
      window.location.reload();
    })

  }

  deleteitem(dish: string, price: any) {
    var jsoncart = {}
    this.userSer.getSingleUser().subscribe((res) => {
      //(res, "res==>");
      delete res.cart[dish]
      jsoncart = res.cart;
      this.userSer.addToCart({ cart: jsoncart }).subscribe((res) => {
        //(jsoncart)
      })
      window.location.reload();
    })
    //(jsoncart)



  }

  confirmfunction() {
    if (this.restaurant.length > 1) {
      alert("Cannot place order from more than one restaurant at a time")
      this.confirmdisplay = false;
      this.router.navigate(['cart'])
    }
  }

  checkoutfunction() {
    //(this.keyvalue)
    this.paymentDisplay = true
    /*
    var cart = new Map<string, any>();
    this.userSer.getSingleUser().subscribe((res) => {

      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addOrderDetails({ cart: jsonObject }).subscribe((res2) => {
        var count = Object.keys(jsonObject).length;
        //(cart)
      })
      window.location.reload();

      this.userSer.addToCart({ cart: null }).subscribe((res1) => {
        //(res1)
      })

      this.router.navigate(['userPage'])
      alert("Your Order Placed Successfully")
    })*/
  }

  paymentfn() {
    var cart = new Map<string, any>();
    this.userSer.getSingleUser().subscribe((res) => {

      //(cart)
      //(res, "res==>");
      for (let value in res.cart) {
        cart.set(value, res.cart[value])
      }
      let jsonObject: any = {};
      cart.forEach((value: any, key: any) => {
        jsonObject[key] = value
      });
      this.userSer.addOrderDetails({ cart: jsonObject }).subscribe((res2) => {
        var count = Object.keys(jsonObject).length;
        //(cart)
      })
      window.location.reload();

      this.userSer.addToCart({ cart: null }).subscribe((res1) => {
        //(res1)
      })

      this.router.navigate(['userPage'])
      alert("Your Order Placed Successfully")
    })
  }
}

