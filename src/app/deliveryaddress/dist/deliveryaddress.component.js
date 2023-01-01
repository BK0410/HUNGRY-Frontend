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
exports.DeliveryaddressComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DeliveryaddressComponent = /** @class */ (function() {
    function DeliveryaddressComponent(userSer, router, router2) {
        this.userSer = userSer;
        this.router = router;
        this.router2 = router2;
        this.count = 0;
        this.tokendisplay = true;
        this.addressForm = new forms_1.FormGroup({
            'Address_Line1': new forms_1.FormControl('', forms_1.Validators.required),
            'Address_Line2': new forms_1.FormControl('', forms_1.Validators.required),
            'Landmark': new forms_1.FormControl('', forms_1.Validators.required),
            'City_Pincode': new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    DeliveryaddressComponent.prototype.ngOnInit = function() {
        var _this = this;
        var token = localStorage.getItem('token');
        var refreshToken = localStorage.getItem('refreshToken');
        var base64Payload = token.split('.')[1];
        //.log(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        //.log(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['not-found']);
        }
        var exp = JSON.parse(payload1).exp;
        var expired = Date.now() >= exp * 1000;
        //.log("________" + expired);
        if (expired == true) {
            this.tokendisplay = false;
            this.userSer.token(JSON.parse(payload1).Email_ID, refreshToken).subscribe(function(res) {
                //.log("+++++++++++++" + res.token);
                localStorage.setItem('token', res.token);
                window.location.reload();
            });
        }
        this.userSer.getSingleUser().subscribe(function(res) {
            //.log(res, "res==>");
            _this.user = res;
            //.log(res);
        });
        this.userSer.getSingleUser().subscribe(function(res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    DeliveryaddressComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    DeliveryaddressComponent.prototype.address = function() {
        var _this = this;
        if (this.addressForm.valid) {
            this.userSer.address(this.addressForm.value).subscribe(function(res) {
                alert("Delivery Address Saved successfully");
                _this.addressForm.reset();
                _this.router.navigate(['/userPage']);
            });
        } else {
            alert("All fields are required");
        }
    };
    DeliveryaddressComponent = __decorate([
        core_1.Component({
            selector: 'app-deliveryaddress',
            templateUrl: './deliveryaddress.component.html',
            styleUrls: ['./deliveryaddress.component.css']
        })
    ], DeliveryaddressComponent);
    return DeliveryaddressComponent;
}());
exports.DeliveryaddressComponent = DeliveryaddressComponent;