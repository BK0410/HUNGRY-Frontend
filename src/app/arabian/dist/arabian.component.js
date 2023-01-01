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
exports.ArabianComponent = void 0;
var core_1 = require("@angular/core");
var ArabianComponent = /** @class */ (function() {
    function ArabianComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.count = 0;
        this.searchText = '';
        this.menudisplay = false;
    }
    ArabianComponent.prototype.ngOnInit = function() {
        var _this = this;
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        //.log(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //.log(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        this.userSer.getFoodTable().subscribe(function(res) {
            //.log(res, "res==>");
            _this.categories = res;
        });
        this.userSer.getSingleUser().subscribe(function(res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    ArabianComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    ArabianComponent.prototype.addToCart = function(dish, price, restaurant) {
        var _this = this;
        this.count = this.count + 1;
        this.userSer.getSingleUser().subscribe(function(res) {
            var cart = new Map();
            //.log(cart);
            //.log(res, "res==>");
            for (var value_1 in res.cart) {
                cart.set(value_1, res.cart[value_1]);
            }
            //.log(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                cart.set(dish, [value + 1, price * (value + 1), restaurant]);
                localStorage.setItem(dish, [value + 1, price + price].toString());
            } else {
                cart.set(dish, [1, price, restaurant]);
                //.log("new obj");
            }
            //.log(cart);
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
    ArabianComponent = __decorate([
        core_1.Component({
            selector: 'app-arabian',
            templateUrl: './arabian.component.html',
            styleUrls: ['./arabian.component.css']
        })
    ], ArabianComponent);
    return ArabianComponent;
}());
exports.ArabianComponent = ArabianComponent;