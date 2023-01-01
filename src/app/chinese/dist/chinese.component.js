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
exports.ChineseComponent = void 0;
var core_1 = require("@angular/core");
var ChineseComponent = /** @class */ (function() {
    function ChineseComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.count = 0;
        this.searchText = '';
        this.tokendisplay = true;
        this.menudisplay = false;
    }
    ChineseComponent.prototype.ngOnInit = function() {
        var _this = this;
        var token = localStorage.getItem('token');
        var refreshToken = localStorage.getItem('refreshToken');
        var base64Payload = token.split('.')[1];
        //(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        var exp = JSON.parse(payload1).exp;
        var expired = Date.now() >= exp * 1000;
        //("________" + expired);
        if (expired == true) {
            this.tokendisplay = false;
            this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe(function(res) {
                //("+++++++++++++" + res.token);
                localStorage.setItem('token', res.token);
                window.location.reload();
            });
        }
        this.userSer.getFoodTable().subscribe(function(res) {
            //(res, "res==>");
            _this.categories = res;
        });
        this.userSer.getSingleUser().subscribe(function(res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    ChineseComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    ChineseComponent.prototype.reload = function() {
        window.location.reload();
    };
    ChineseComponent.prototype.addToCart = function(dish, price, restaurant) {
        var _this = this;
        var token = localStorage.getItem('token');
        var refreshToken = localStorage.getItem('refreshToken');
        var base64Payload = token.split('.')[1];
        //(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        var exp = JSON.parse(payload1).exp;
        var expired = Date.now() >= exp * 1000;
        //("________" + expired);
        if (expired == true || expired == false) {
            this.tokendisplay = false;
            this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe(function(res) {
                //("+++++++++++++" + res.token);
                localStorage.setItem('token', res.token);
                // alert("Session restored...Please add the dish to cart once again")
                // window.location.reload()
            });
        }
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
                // window.location.reload()
                // alert("Dish added to Cart successfully")
            });
        });
    };
    ChineseComponent = __decorate([
        core_1.Component({
            selector: 'app-chinese',
            templateUrl: './chinese.component.html',
            styleUrls: ['./chinese.component.css']
        })
    ], ChineseComponent);
    return ChineseComponent;
}());
exports.ChineseComponent = ChineseComponent;