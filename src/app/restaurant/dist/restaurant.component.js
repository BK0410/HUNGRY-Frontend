"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RestaurantComponent = void 0;
var core_1 = require("@angular/core");
var RestaurantComponent = /** @class */ (function () {
    function RestaurantComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.searchText = '';
        this.tokendisplay = true;
        this.menudisplay = false;
    }
    RestaurantComponent.prototype.ngOnInit = function () {
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
        this.userSer.getRestaurants().subscribe(function (res) {
            console.log(res, "res==>");
            _this.restaurants = res;
        });
    };
    RestaurantComponent.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    RestaurantComponent = __decorate([
        core_1.Component({
            selector: 'app-restaurant',
            templateUrl: './restaurant.component.html',
            styleUrls: ['./restaurant.component.css']
        })
    ], RestaurantComponent);
    return RestaurantComponent;
}());
exports.RestaurantComponent = RestaurantComponent;
