"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var backend_service_1 = require("./backend.service");
describe('BackendService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(backend_service_1.BackendService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
