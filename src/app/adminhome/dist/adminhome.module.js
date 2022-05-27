"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdminhomeModule = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var adminhome_routing_module_1 = require("./adminhome-routing.module");
var adminhome_component_1 = require("./adminhome.component");
var AdminhomeModule = /** @class */ (function () {
    function AdminhomeModule() {
    }
    AdminhomeModule = __decorate([
        core_1.NgModule({
            declarations: [
                adminhome_component_1.AdminhomeComponent
            ],
            imports: [
                common_1.CommonModule,
                adminhome_routing_module_1.AdminhomeRoutingModule,
                forms_1.ReactiveFormsModule
            ]
        })
    ], AdminhomeModule);
    return AdminhomeModule;
}());
exports.AdminhomeModule = AdminhomeModule;
