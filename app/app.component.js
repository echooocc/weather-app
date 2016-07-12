System.register(['angular2/core', 'angular2/router', 'angular2/http', './weather.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, weather_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (weather_service_1_1) {
                weather_service_1 = weather_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_weatherService) {
                    this._weatherService = _weatherService;
                    this.title = 'Weather App';
                    this.serviceError = false;
                }
                AppComponent.prototype.search = function (city) {
                    var _this = this;
                    this._weatherService.getWeather(city)
                        .subscribe(function (res) { _this.weathers = res; }, function (err) { _this.serviceError = true; }, function () { return console.log('success! ' + _this.weathers); });
                    this._weatherService.getLocation(city)
                        .subscribe(function (res) { _this.location = res; }, function (err) { _this.serviceError = true; }, function () { return console.log('success! ' + _this.weathers); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'weather-app',
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [weather_service_1.WeatherService, http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [weather_service_1.WeatherService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
