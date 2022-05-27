"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotfoundComponent = void 0;
var core_1 = require("@angular/core");
var NotfoundComponent = /** @class */ (function () {
    function NotfoundComponent(router) {
        this.router = router;
        this.menudisplay = false;
    }
    NotfoundComponent.prototype.ngOnInit = function () {
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        console.log(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        console.log(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "ADMIN") {
            this.router.navigate(['admin']);
        }
    };
    NotfoundComponent = __decorate([
        core_1.Component({
            selector: 'app-notfound',
            templateUrl: './notfound.component.html',
            styleUrls: ['./notfound.component.css']
        })
    ], NotfoundComponent);
    return NotfoundComponent;
}());
exports.NotfoundComponent = NotfoundComponent;
