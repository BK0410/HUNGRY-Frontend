"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BackendService = void 0;
var core_1 = require("@angular/core");
var BackendService = /** @class */ (function () {
    function BackendService(_http, router) {
        this._http = _http;
        this.router = router;
        this.apiurl = "http://localhost:9000/api/getSingleUser";
        this.categoryurl = "http://localhost:9000/api/users/category";
        this.restauranturl = "http://localhost:9000/api/users/restaurant";
        this.userurl = "http://localhost:9000/api/users/user";
        this.dishurl = "http://localhost:9000/api/users/dish";
    }
    BackendService.prototype.signup = function (user) {
        return this._http.post("http://localhost:9000/api/users/signup", user);
    };
    BackendService.prototype.token = function (Email_ID, refreshToken) {
        return this._http.post("http://localhost:9000/api/users/token", { Email_ID: Email_ID, refreshToken: refreshToken }, { responseType: 'json' });
    };
    BackendService.prototype.addCategory = function (category) {
        return this._http.post("http://localhost:9000/api/users/addCategory", category);
    };
    BackendService.prototype.addRestaurant = function (restaurant) {
        return this._http.post("http://localhost:9000/api/users/addRestaurant", restaurant);
    };
    BackendService.prototype.addDish = function (dish) {
        return this._http.post("http://localhost:9000/api/users/addDish", dish);
    };
    BackendService.prototype.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    BackendService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    BackendService.prototype.login = function (Email_ID, Password) {
        return this._http.post("http://localhost:9000/api/users/login", { Email_ID: Email_ID, Password: Password }, { responseType: 'json' });
    };
    BackendService.prototype.adminlogin = function (Email_ID, Password) {
        return this._http.post("http://localhost:9000/api/users/adminlogin", { Email_ID: Email_ID, Password: Password }, { responseType: 'json' });
    };
    BackendService.prototype.address = function (user) {
        return this._http.post("http://localhost:9000/api/users/address", user);
    };
    BackendService.prototype.isLoggedIn = function () {
        return this.getToken() !== null;
    };
    BackendService.prototype.getToken = function () {
        // console.log(localStorage.getItem('token'))
        return localStorage.getItem('token');
    };
    BackendService.prototype.getSingleUser = function () {
        return this._http.get("http://localhost:9000/api/users/getSingleUser");
    };
    BackendService.prototype.getSingleRestauarant = function (id) {
        return this._http.get("http://localhost:9000/api/users/getSingleRestaurant");
    };
    BackendService.prototype.getCategories = function () {
        return this._http.get("http://localhost:9000/api/users/getCategories");
    };
    BackendService.prototype.getUsers = function () {
        return this._http.get("http://localhost:9000/api/users/getUsers");
    };
    BackendService.prototype.getFoodTable = function () {
        return this._http.get("http://localhost:9000/api/users/getFoodTable");
    };
    BackendService.prototype.getRestaurants = function () {
        return this._http.get("http://localhost:9000/api/users/getRestaurants");
    };
    BackendService.prototype.addToCart = function (user) {
        return this._http.post("http://localhost:9000/api/users/addToCart", user);
    };
    BackendService.prototype.addOrderDetails = function (user) {
        return this._http.post("http://localhost:9000/api/users/addOrderDetails", user);
    };
    BackendService.prototype.getUserOrderDetails = function () {
        return this._http.get("http://localhost:9000/api/users/getUserOrderDetails");
    };
    BackendService.prototype.deleteCategory = function (id) {
        var ids = id;
        window.location.reload();
        return this._http["delete"](this.categoryurl + "/" + ids);
    };
    BackendService.prototype.updateCategory = function (user, id) {
        var ids = id;
        return this._http.put(this.categoryurl + "/" + ids, user);
    };
    BackendService.prototype.deleteRestaurant = function (id) {
        var ids = id;
        window.location.reload();
        return this._http["delete"](this.restauranturl + "/" + ids);
    };
    BackendService.prototype.deleteUser = function (id) {
        var ids = id;
        window.location.reload();
        return this._http["delete"](this.userurl + "/" + ids);
    };
    BackendService.prototype.updateRestaurant = function (restaurant, id) {
        var ids = id;
        window.location.reload();
        return this._http.put(this.restauranturl + "/" + ids, restaurant);
    };
    BackendService.prototype.updateUser = function (user, id) {
        var ids = id;
        return this._http.put(this.apiurl + "/" + ids, user);
    };
    BackendService.prototype.deleteDish = function (id) {
        var ids = id;
        window.location.reload();
        return this._http["delete"](this.dishurl + "/" + ids);
    };
    BackendService.prototype.updateDish = function (user, id) {
        var ids = id;
        return this._http.put(this.dishurl + "/" + ids, user);
    };
    BackendService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], BackendService);
    return BackendService;
}());
exports.BackendService = BackendService;
