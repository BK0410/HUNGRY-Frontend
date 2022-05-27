"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminhomeComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdminhomeComponent = /** @class */ (function () {
    function AdminhomeComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.loginForm = new forms_1.FormGroup({
            'Email_ID': new forms_1.FormControl('', forms_1.Validators.required),
            'Password': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    AdminhomeComponent.prototype.ngOnInit = function () {
        if (this.userSer.isLoggedIn()) {
            alert("Admin already logged in");
            this.router.navigate(["admin"]);
        }
    };
    AdminhomeComponent.prototype.setToken = function (token) {
        localStorage.setItem('token', token);
    };
    AdminhomeComponent.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AdminhomeComponent.prototype.isLoggedIn = function () {
        return this.getToken() !== null;
    };
    AdminhomeComponent.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    AdminhomeComponent.prototype.adminlogin = function () {
        var _this = this;
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
            this.userSer.adminlogin(this.loginForm.value.Email_ID, this.loginForm.value.Password).subscribe(function (res) {
                console.log(res, "res=>");
                // console.log(res.token)
                _this.setToken(res.token);
                _this.router.navigate(['/admin']);
                alert("Admin Logged in successfully");
            }, function (err) {
                alert("Invalid Username or Password");
                console.log('HTTP Error', err);
            });
        }
        else {
            alert("All fields are required");
        }
    };
    AdminhomeComponent = __decorate([
        core_1.Component({
            selector: 'app-adminhome',
            templateUrl: './adminhome.component.html',
            styleUrls: ['./adminhome.component.css']
        })
    ], AdminhomeComponent);
    return AdminhomeComponent;
}());
exports.AdminhomeComponent = AdminhomeComponent;
