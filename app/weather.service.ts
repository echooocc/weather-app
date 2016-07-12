import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'; //add this to avoid "this._http.get(...).map is not a function" error

@Injectable()
export class WeatherService{
    constructor(private _http: Http) { }
    public API_BASE_URL = window.location.href+'city/';
    getWeather(city: string) { 
       return this._http.get(this.API_BASE_URL+city)
        .map(res => res.json().list);
    }
     getLocation(city: string) { 
       return this._http.get(this.API_BASE_URL+city)
        .map(res => res.json().city.name + ', ' + res.json().city.country);
    }
}