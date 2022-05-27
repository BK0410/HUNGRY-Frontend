"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AdminComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(userSer, router, router2) {
        this.userSer = userSer;
        this.router = router;
        this.router2 = router2;
        this.count = 0;
        this.searchText = '';
        this.searchWord = "";
        this.display = false;
        this.dishDisplay = false;
        this.restaurantName = '';
        this.cuisineName = '';
        this.dishName = '';
        this.price = '';
        this.selectedOption = '';
        this.printedOption = '';
        this.addCategoryForm = new forms_1.FormGroup({
            'CategoryName': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.addRestaurantForm = new forms_1.FormGroup({
            'RestaurantName': new forms_1.FormControl('', forms_1.Validators.required),
            'CuisineName': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.updateDishForm = new forms_1.FormGroup({
            'DishName': new forms_1.FormControl('', forms_1.Validators.required),
            'CuisineName': new forms_1.FormControl('', forms_1.Validators.required),
            'RestaurantName': new forms_1.FormControl('', forms_1.Validators.required),
            'Price': new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.addDishForm = new forms_1.FormGroup({
            'DishName': new forms_1.FormControl(),
            'CuisineName': new forms_1.FormControl(''),
            'RestaurantName': new forms_1.FormControl(''),
            'Price': new forms_1.FormControl('')
        });
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("=================" + this.searchText);
        var token = localStorage.getItem('token');
        var base64Payload = token.split('.')[1];
        console.log(base64Payload);
        var payload1 = Buffer.from(base64Payload, 'base64');
        console.log(JSON.parse(payload1));
        if (JSON.parse(payload1).role === "USER") {
            this.router.navigate(['not-found']);
        }
        this.userSer.getFoodTable().subscribe(function (res) {
            console.log(res, "res==>");
            _this.dishes = res;
        });
        this.userSer.getUsers().subscribe(function (res) {
            console.log(res, "res==>");
            _this.users = res;
        });
        this.userSer.getCategories().subscribe(function (res) {
            console.log(res, "res==>");
            _this.categories = res;
        });
        this.userSer.getRestaurants().subscribe(function (res) {
            console.log(res, "res==>");
            _this.restaurants = res;
        });
        this.userSer.getSingleUser().subscribe(function (res) {
            _this.count = Object.keys(res.cart).length;
        });
    };
    AdminComponent.prototype.scroll = function (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    };
    AdminComponent.prototype.logout = function () {
        localStorage.removeItem('token');
        this.router.navigate(['adminhome']);
    };
    AdminComponent.prototype.print = function () {
        this.printedOption = this.selectedOption;
    };
    AdminComponent.prototype.addToCart = function (dish, price, restaurant) {
        var _this = this;
        this.count = this.count + 1;
        this.userSer.getSingleUser().subscribe(function (res) {
            var cart = new Map();
            console.log(cart);
            console.log(res, "res==>");
            for (var value_1 in res.cart) {
                cart.set(value_1, res.cart[value_1]);
            }
            console.log(cart);
            if (cart.has(dish)) {
                var value = cart.get(dish)[0];
                cart.set(dish, [value + 1, price * (value + 1), restaurant]);
            }
            else {
                cart.set(dish, [1, price, restaurant]);
                console.log("new obj");
            }
            console.log(cart);
            var jsonObject = {};
            cart.forEach(function (value, key) {
                jsonObject[key] = value;
            });
            _this.userSer.addToCart({ cart: jsonObject }).subscribe(function (res) {
                var count = Object.keys(jsonObject).length;
                alert("Dish added to Cart successfully");
            });
        });
    };
    AdminComponent.prototype.deleteCategory = function (id) {
        this.userSer.deleteCategory(id).subscribe(function (res) {
        });
    };
    AdminComponent.prototype.deleteRestaurant = function (id) {
        this.userSer.deleteRestaurant(id).subscribe(function (res) {
        });
    };
    AdminComponent.prototype.deleteUser = function (id) {
        this.userSer.deleteUser(id).subscribe(function (res) {
        });
    };
    AdminComponent.prototype.deleteDish = function (id) {
        this.userSer.deleteDish(id).subscribe(function (res) {
        });
    };
    AdminComponent.prototype.updatefn = function () {
        console.log(this.restaurantName);
        console.log(this.dishName);
        console.log(this.cuisineName);
        console.log(this.price);
    };
    AdminComponent.prototype.addCategory = function () {
        var _this = this;
        if (this.addCategoryForm.valid) {
            this.userSer.addCategory(this.addCategoryForm.value).subscribe(function (res) {
                alert("Category Added Successfully");
                _this.addCategoryForm.reset();
                window.location.reload();
            });
        }
        else {
            alert("Please Enter Category Name");
        }
    };
    AdminComponent.prototype.addRestaurant = function () {
        var _this = this;
        if (this.addRestaurantForm.valid) {
            this.userSer.addRestaurant(this.addRestaurantForm.value).subscribe(function (res) {
                alert("Restaurant Added Successfully");
                _this.addRestaurantForm.reset();
                window.location.reload();
            });
        }
        else {
            alert("Invalid Input");
        }
    };
    AdminComponent.prototype.addDish = function () {
        var _this = this;
        if (this.addDishForm.valid) {
            this.userSer.addDish(this.addDishForm.value).subscribe(function (res) {
                alert("Dish Added Successfully");
                _this.addDishForm.reset();
                window.location.reload();
            });
        }
        else {
            alert("Invalid Input");
        }
    };
    // updatefunction(id:any) {
    //   this.display = true;
    //   this.getParamid = 
    // }
    AdminComponent.prototype.updateRestaurant = function () {
        console.log(this.getParamid);
        if (this.addRestaurantForm.valid) {
            this.userSer.updateRestaurant(this.addRestaurantForm.value, this.getParamid).subscribe(function (res) {
                alert("Restaurant Updated successfully");
                window.location.reload();
            });
        }
        else {
            alert("All fields are required");
        }
    };
    AdminComponent.prototype.updateDish = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updatefn];
                    case 1:
                        a = _a.sent();
                        if (this.updateDishForm.valid) {
                            this.userSer.updateDish(this.updateDishForm.value, this.getParamid).subscribe(function (res) {
                                alert("Dish Updated successfully");
                                window.location.reload();
                            });
                        }
                        else {
                            alert("All fields are required");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css']
        })
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
