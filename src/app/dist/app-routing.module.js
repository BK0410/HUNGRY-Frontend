"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./auth.guard");
var routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' }, { path: 'home', loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomeModule; }); } },
    { path: 'login', loadChildren: function () { return Promise.resolve().then(function () { return require('./login/login.module'); }).then(function (m) { return m.LoginModule; }); } },
    { path: 'signup', loadChildren: function () { return Promise.resolve().then(function () { return require('./signup/signup.module'); }).then(function (m) { return m.SignupModule; }); } },
    { path: 'userPage', loadChildren: function () { return Promise.resolve().then(function () { return require('./user-page/user-page.module'); }).then(function (m) { return m.UserPageModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'deliveryaddress', loadChildren: function () { return Promise.resolve().then(function () { return require('./deliveryaddress/deliveryaddress.module'); }).then(function (m) { return m.DeliveryaddressModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Italian', loadChildren: function () { return Promise.resolve().then(function () { return require('./italian/italian.module'); }).then(function (m) { return m.ItalianModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Indian', loadChildren: function () { return Promise.resolve().then(function () { return require('./indian/indian.module'); }).then(function (m) { return m.IndianModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Chinese', loadChildren: function () { return Promise.resolve().then(function () { return require('./chinese/chinese.module'); }).then(function (m) { return m.ChineseModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'Arabian', loadChildren: function () { return Promise.resolve().then(function () { return require('./arabian/arabian.module'); }).then(function (m) { return m.ArabianModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'restaurant', loadChildren: function () { return Promise.resolve().then(function () { return require('./restaurant/restaurant.module'); }).then(function (m) { return m.RestaurantModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'test', loadChildren: function () { return Promise.resolve().then(function () { return require('./test/test.module'); }).then(function (m) { return m.TestModule; }); } },
    { path: 'cart', loadChildren: function () { return Promise.resolve().then(function () { return require('./cart/cart.module'); }).then(function (m) { return m.CartModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'checkout', loadChildren: function () { return Promise.resolve().then(function () { return require('./checkout/checkout.module'); }).then(function (m) { return m.CheckoutModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'myOrders', loadChildren: function () { return Promise.resolve().then(function () { return require('./my-orders/my-orders.module'); }).then(function (m) { return m.MyOrdersModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'admin', loadChildren: function () { return Promise.resolve().then(function () { return require('./admin/admin.module'); }).then(function (m) { return m.AdminModule; }); }, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', loadChildren: function () { return Promise.resolve().then(function () { return require('./notfound/notfound.module'); }).then(function (m) { return m.NotfoundModule; }); }, canActivate: [auth_guard_1.AuthGuard] }];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
