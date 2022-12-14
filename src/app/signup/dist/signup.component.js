"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignupComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.menudisplay = false;
        this.signupForm = new forms_1.FormGroup({
            'First_Name': new forms_1.FormControl('', forms_1.Validators.required),
            'Last_Name': new forms_1.FormControl('', forms_1.Validators.required),
            'Email_ID': new forms_1.FormControl('', forms_1.Validators.required),
            'Password': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    SignupComponent.prototype.ngOnInit = function () {
    };
    SignupComponent.prototype.signup = function () {
        var _this = this;
        if (this.signupForm.valid) {
            this.userSer.signup(this.signupForm.value).subscribe(function (res) {
                alert("User registered successfully");
                _this.signupForm.reset();
                _this.router.navigate(['/login']);
            });
        }
        else {
            alert("All fields are required");
        }
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
