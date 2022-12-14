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
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function() {
    function LoginComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.menudisplay = false;
        this.loginForm = new forms_1.FormGroup({
            'Email_ID': new forms_1.FormControl('', forms_1.Validators.required),
            'Password': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    LoginComponent.prototype.ngOnInit = function() {
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        //(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        if (this.userSer.isLoggedIn()) {
            alert("User already logged in");
            this.router.navigate(["userPage"]);
        }
    };
    LoginComponent.prototype.setToken = function(token) {
        localStorage.setItem('token', token);
    };
    LoginComponent.prototype.getToken = function() {
        return localStorage.getItem('token');
    };
    LoginComponent.prototype.isLoggedIn = function() {
        return this.getToken() !== null;
    };
    LoginComponent.prototype.getRefreshToken = function() {
        return localStorage.getItem("refreshToken");
    };
    LoginComponent.prototype.setRefreshToken = function(refreshToken) {
        //("+++++++++++++++++" + refreshToken);
        localStorage.setItem("refreshToken", refreshToken);
    };
    LoginComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    LoginComponent.prototype.login = function() {
        var _this = this;
        if (this.loginForm.valid) {
            //(this.loginForm.value);
            this.userSer.login(this.loginForm.value.Email_ID, this.loginForm.value.Password).subscribe(function(res) {
                //(res, "res=>");
                // //(res.token)
                _this.setToken(res.token);
                _this.setRefreshToken(res.refreshToken);
                _this.router.navigate(['/userPage']);
                alert("User Logged in successfully");
            }, function(err) {
                alert("Invalid Username or Password");
                //('HTTP Error', err);
            });
        } else {
            alert("All fields are required");
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;