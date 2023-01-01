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
exports.MyOrdersComponent = void 0;
var core_1 = require("@angular/core");
var MyOrdersComponent = /** @class */ (function() {
    function MyOrdersComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.display = true;
        this.tokendisplay = true;
        this.count = 0;
    }
    MyOrdersComponent.prototype.ngOnInit = function() {
        var _this = this;
        var token = localStorage.getItem('token');
        var refreshToken = localStorage.getItem('refreshToken');
        var base64Payload = token.split('.')[1];
        var payload1 = Buffer.from(base64Payload, 'base64');
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        var exp = JSON.parse(payload1).exp;
        var expired = Date.now() >= exp * 1000;
        if (expired == true) {
            this.tokendisplay = false;
            this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe(function(res) {
                localStorage.setItem('token', res.token);
                window.location.reload();
            });
        }
        this.userSer.getUserOrderDetails().subscribe(function(res) {
            if (res.length > 0) {
                _this.display = false;
            }
            _this.categories = res;
            for (var i = 0; i < _this.categories.length; i++) {
                var sum = 0;
                for (var j = 0; j < _this.categories[i][4].length; j++) {
                    sum = sum + _this.categories[i][4][j];
                }
                _this.categories[i].push(sum);
            }
        });
        this.userSer.getSingleUser().subscribe(function(res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    MyOrdersComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    MyOrdersComponent.prototype.getToken = function() {
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        var payload1 = Buffer.from(base64Payload, 'base64');
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
    };
    MyOrdersComponent.prototype.isLoggedIn = function() {
        return this.getToken() !== null;
    };
    MyOrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-my-orders',
            templateUrl: './my-orders.component.html',
            styleUrls: ['./my-orders.component.css']
        })
    ], MyOrdersComponent);
    return MyOrdersComponent;
}());
exports.MyOrdersComponent = MyOrdersComponent;

function isTokenExpired(token, arg1) {
    throw new Error('Function not implemented.');
}