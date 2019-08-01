import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiWeatherForecast} from "../models/ApiWeatherForecast";
import {ApiWeatherCurrent} from "../models/ApiWeatherCurrent";

@Injectable()
export class WeatherService {
  weatherUrl:string = 'https://api.openweathermap.org/data/2.5/';
  apiKey:string = 'b349028353f271320b009dff70b0ea62';
  units:string = 'metric';

  constructor(private http:HttpClient) { }

  getForecast(city='Tallinn,EE'):Observable<ApiWeatherForecast>{
    return this.http.get<any>(`${this.weatherUrl}/forecast?q=${city}&units=${this.units}&APPID=${this.apiKey}`)
  }

  getCurrent(city='Tallinn,EE'):Observable<ApiWeatherCurrent>{
    return this.http.get<any>(`${this.weatherUrl}/weather?q=${city}&units=${this.units}&APPID=${this.apiKey}`)
  }
}
