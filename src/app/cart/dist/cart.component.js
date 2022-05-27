"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartComponent = void 0;
var core_1 = require("@angular/core");
var CartComponent = /** @class */ (function () {
    function CartComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.count = 0;
        this.searchText = '';
        this.display = true;
        this.keyvalue = [];
        this.totalprice = 0;
        this.restaurant = [];
        this.confirmdisplay = true;
        this.tokendisplay = true;
        this.paymentDisplay = false;
    }
    CartComponent.prototype.ngOnInit = function () {
        var _this = this;
        var token = localStorage.getItem('token');
        var refreshToken = localStorage.getItem('refreshToken');
        var base64Payload = token.split('.')[1];
        console.log(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        console.log(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        var exp = JSON.parse(payload1).exp;
        var expired = Date.now() >= exp * 1000;
        console.log("________" + expired);
        if (expired == true) {
            this.tokendisplay = false;
            this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe(function (res) {
                console.log("+++++++++++++" + res.token);
                localStorage.setItem('token', res.token);
                window.location.reload();
            });
        }
        this.userSer.getFoodTable().subscribe(function (res) {
            console.log(res, "res==>");
            _this.categories = res;
        });
        this.userSer.getSingleUser().subscribe(function (res) {
            _this.count = Object.keys(res.cart).length;
            if (_this.count !== 0 || _this.count == NaN) {
                _this.display = false;
            }
            for (var item in res.cart) {
                _this.keyvalue.push([item, res.cart[item][0], res.cart[item][1], res.cart[item][2]]);
                if (!_this.restaurant.includes(res.cart[item][2])) {
                    _this.restaurant.push(res.cart[item][2]);
                }
                if (_this.restaurant.length > 1) {
                    _this.confirmdisplay = false;
                }
                console.log("++++++++++++++++++++++++++" + _this.restaurant);
                _this.totalprice = res.cart[item][1] + _this.totalprice;
                console.log(_this.totalprice);
            }
            _this.user = res;
        });
    };
    CartComponent.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    CartComponent.prototype.addToCart = function (dish, price) {
        var _this = this;
        var cart = new Map();
        this.userSer.getSingleUser().subscribe(function (res) {
            console.log(cart);
            console.log(res, "res==>");
            for (var value_1 in res.cart) {
                cart.set(value_1, res.cart[value_1]);
            }
            console.log(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                cart.set(dish, [value + 1, price + price]);
            }
            else {
                cart.set(dish, [1, price]);
                localStorage.setItem(dish, [1, price].toString());
                console.log("new obj");
            }
            console.log(cart);
            var jsonObject = {};
            cart.forEach(function (value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addToCart({ cart: jsonObject }).subscribe(function (res) {
                var count = Object.keys(jsonObject).length;
                alert("Dish added to Cart successfully");
            });
        });
    };
    CartComponent.prototype.subtract = function (dish, price, quantity, restaurant) {
        var _this = this;
        var cart = new Map();
        this.userSer.getSingleUser().subscribe(function (res) {
            console.log(cart);
            console.log(res, "res==>");
            for (var value_2 in res.cart) {
                cart.set(value_2, res.cart[value_2]);
            }
            console.log(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                if (value !== 1) {
                    cart.set(dish, [value - 1, (price / quantity) * (quantity - 1), restaurant]);
                }
                else {
                    var jsoncart = {};
                    _this.userSer.getSingleUser().subscribe(function (res) {
                        console.log(res, "res==>");
                        delete res.cart[dish];
                        jsoncart = res.cart;
                        _this.userSer.addToCart({ cart: jsoncart }).subscribe(function (res) {
                            console.log(jsoncart);
                        });
                        window.location.reload();
                    });
                    console.log(jsoncart);
                }
            }
            else {
                cart.set(dish, [1, price, restaurant]);
                console.log("new obj");
            }
            console.log(cart);
            var jsonObject = {};
            cart.forEach(function (value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addToCart({ cart: jsonObject }).subscribe(function (res) {
                var count = Object.keys(jsonObject).length;
                console.log(cart);
            });
            window.location.reload();
        });
    };
    CartComponent.prototype.add = function (dish, price, quantity, restaurant) {
        var _this = this;
        var cart = new Map();
        this.userSer.getSingleUser().subscribe(function (res) {
            console.log(cart);
            console.log(res, "res==>");
            for (var value_3 in res.cart) {
                cart.set(value_3, res.cart[value_3]);
            }
            console.log(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                cart.set(dish, [value + 1, (price / quantity) * (quantity + 1), restaurant]);
            }
            else {
                cart.set(dish, [1, price, restaurant]);
                console.log("new obj");
            }
            console.log(cart);
            var jsonObject = {};
            cart.forEach(function (value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addToCart({ cart: jsonObject }).subscribe(function (res) {
                var count = Object.keys(jsonObject).length;
                console.log(cart);
            });
            window.location.reload();
        });
    };
    CartComponent.prototype.deleteitem = function (dish, price) {
        var _this = this;
        var jsoncart = {};
        this.userSer.getSingleUser().subscribe(function (res) {
            console.log(res, "res==>");
            delete res.cart[dish];
            jsoncart = res.cart;
            _this.userSer.addToCart({ cart: jsoncart }).subscribe(function (res) {
                console.log(jsoncart);
            });
            window.location.reload();
        });
        console.log(jsoncart);
    };
    CartComponent.prototype.confirmfunction = function () {
        if (this.restaurant.length > 1) {
            alert("Cannot place order from more than one restaurant at a time");
            this.confirmdisplay = false;
            this.router.navigate(['cart']);
        }
    };
    CartComponent.prototype.checkoutfunction = function () {
        console.log(this.keyvalue);
        this.paymentDisplay = true;
        /*
        var cart = new Map<string, any>();
        this.userSer.getSingleUser().subscribe((res) => {
    
          console.log(cart)
          console.log(res, "res==>");
          for (let value in res.cart) {
            cart.set(value, res.cart[value])
          }
          let jsonObject: any = {};
          cart.forEach((value: any, key: any) => {
            jsonObject[key] = value
          });
          this.userSer.addOrderDetails({ cart: jsonObject }).subscribe((res2) => {
            var count = Object.keys(jsonObject).length;
            console.log(cart)
          })
          window.location.reload();
    
          this.userSer.addToCart({ cart: null }).subscribe((res1) => {
            console.log(res1)
          })
    
          this.router.navigate(['userPage'])
          alert("Your Order Placed Successfully")
        })*/
    };
    CartComponent.prototype.paymentfn = function () {
        var _this = this;
        var cart = new Map();
        this.userSer.getSingleUser().subscribe(function (res) {
            console.log(cart);
            console.log(res, "res==>");
            for (var value in res.cart) {
                cart.set(value, res.cart[value]);
            }
            var jsonObject = {};
            cart.forEach(function (value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addOrderDetails({ cart: jsonObject }).subscribe(function (res2) {
                var count = Object.keys(jsonObject).length;
                console.log(cart);
            });
            window.location.reload();
            _this.userSer.addToCart({ cart: null }).subscribe(function (res1) {
                console.log(res1);
            });
            _this.router.navigate(['userPage']);
            alert("Your Order Placed Successfully");
        });
    };
    CartComponent = __decorate([
        core_1.Component({
            selector: 'app-cart',
            templateUrl: './cart.component.html',
            styleUrls: ['./cart.component.css']
        })
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
