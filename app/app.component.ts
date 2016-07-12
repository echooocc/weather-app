import {Component, Input} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {WeatherService} from './weather.service';

@Component({
    selector: 'weather-app',
    templateUrl: 'app/app.component.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [WeatherService, HTTP_PROVIDERS]
})

export class AppComponent{  
    title = 'Weather App';  
    constructor(private _weatherService: WeatherService) { }
    public weathers: any;
    public location: any;
    public serviceError: boolean = false;
    search(city: string) {
        this._weatherService.getWeather(city)
            .subscribe(
                    res => {this.weathers = res},
                    err => {this.serviceError = true},
                    () => console.log('success! '+this.weathers)
            );
        this._weatherService.getLocation(city)
            .subscribe(
                    res => {this.location = res},
                    err => {this.serviceError = true},
                    () => console.log('success! '+this.weathers)
            );
    }
}