"use strict";
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ItalianComponent = void 0;
var core_1 = require("@angular/core");
var ItalianComponent = /** @class */ (function() {
    function ItalianComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.count = 0;
        this.searchText = '';
        this.menudisplay = false;
    }
    ItalianComponent.prototype.ngOnInit = function() {
        var _this = this;
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        //(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        this.userSer.getFoodTable().subscribe(function(res) {
            //(res, "res==>");
            _this.categories = res;
        });
        this.userSer.getSingleUser().subscribe(function(res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    ItalianComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    ItalianComponent.prototype.addToCart = function(dish, price, restaurant) {
        var _this = this;
        this.count = this.count + 1;
        this.userSer.getSingleUser().subscribe(function(res) {
            var cart = new Map();
            //(cart);
            //(res, "res==>");
            for (var value_1 in res.cart) {
                cart.set(value_1, res.cart[value_1]);
            }
            //(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                cart.set(dish, [value + 1, price * (value + 1), restaurant]);
                localStorage.setItem(dish, [value + 1, price + price].toString());
            } else {
                cart.set(dish, [1, price, restaurant]);
                //("new obj");
            }
            //(cart);
            var jsonObject = {};
            cart.forEach(function(value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addToCart({ cart: jsonObject }).subscribe(function(res) {
                var count = Object.keys(jsonObject).length;
                // alert("Dish added to Cart successfully")
            });
        });
    };
    ItalianComponent = __decorate([
        core_1.Component({
            selector: 'app-italian',
            templateUrl: './italian.component.html',
            styleUrls: ['./italian.component.css']
        })
    ], ItalianComponent);
    return ItalianComponent;
}());
exports.ItalianComponent = ItalianComponent;
// setCart(cart: Map<string,any>): void {
//   localStorage.setItem('token', JSON.stringify(cart));
// }
// getToken(): string | null {
//   return localStorage.getItem('token');
// }