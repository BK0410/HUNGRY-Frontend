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
exports.TestComponent = void 0;
var core_1 = require("@angular/core");
var animations_1 = require("@angular/animations");
var TestComponent = /** @class */ (function() {
    function TestComponent(userSer, router) {
        this.userSer = userSer;
        this.router = router;
        this.searchText = '';
        this.showDiv = {
            previous: false,
            current: false,
            next: false
        };
        this.buttonTextState = 'shown';
        // The text currently being show
        this.buttonText = "ADD TO CART";
        // The text that will be shown when the transition is finished
        this.transitionButtonText = "ADD TO CART";
        this.display = false;
    }
    TestComponent.prototype.ngOnInit = function() {
        var _this = this;
        this.userSer.getFoodTable().subscribe(function(res) {
            _this.categories = res;
        });
    };
    TestComponent.prototype.logout = function() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    };
    /**
     * Respond to the transition event of the button text
     * by setting the text awaiting transition then setting the state as shown
     */
    TestComponent.prototype.buttonTextTransitioned = function(event) {
        this.buttonText = this.transitionButtonText;
        this.buttonTextState = this.buttonTextState = 'shown';
    };
    TestComponent.prototype.onAddToCart = function() {
        var _this = this;
        // Kick off the first transition
        this.buttonTextState = 'transitioning';
        this.transitionButtonText = 'ADDING...';
        // Do whatever logic here. If it is asynchronous, put the remaining code in your subscribe/then callbacks
        // Note if your logic is snappy, you could leave the timeouts in to simulate the animation for a better UX
        setTimeout(function() {
            _this.buttonTextState = 'transitioning';
            _this.transitionButtonText = 'ADDED';
        }, 1800);
        // Reset button text
        setTimeout(function() {
            _this.buttonTextState = 'transitioning';
            _this.transitionButtonText = 'ADD TO CART';
        }, 3600);
    };
    TestComponent.prototype.toggleText = function() {
        var x = document.getElementById("Myid");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    };
    TestComponent.prototype.clickfn = function() {
        if (!this.display) {
            this.display = true;
        }
    };
    TestComponent.prototype.unclickfn = function() {
        this.display = false;
    };
    TestComponent = __decorate([
        core_1.Component({
            selector: 'app-test',
            templateUrl: './test.component.html',
            styleUrls: ['./test.component.css'],
            animations: [
                animations_1.trigger('buttonTextStateTrigger', [
                    animations_1.state('shown', animations_1.style({
                        opacity: 1
                    })),
                    animations_1.state('transitioning', animations_1.style({
                        opacity: 0.3
                    })),
                    animations_1.transition('shown => transitioning', animations_1.animate('600ms ease-out')),
                    animations_1.transition('transitioning => shown', animations_1.animate('600ms ease-in'))
                ])
            ]
        })
    ], TestComponent);
    return TestComponent;
}());
exports.TestComponent = TestComponent;