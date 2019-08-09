import {Component, OnInit} from '@angular/core';
import {Weather} from '../../models/Weather'
import {CommunicationService} from '../../services/communication.service';
import {WeatherDayforecast} from "../../models/weather-dayforecast";
import {Location} from "../../models/location";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  forecast: Weather[];
  current: Weather;
  dayForecast: WeatherDayforecast[];
  location:Location = {name: null, key:null};
  unit: string = 'C';

  constructor(private weatherService:CommunicationService, private storage:LocalStorageService, private router:Router) {
  }


  ngOnInit() {
    this.location = this.storage.getLocation();
    if(!this.location.key){
      this.router.navigate(['/location'])
    }

    //Load old information
    this.current = this.storage.getWeather('current');
    this.forecast = this.storage.getWeather('forecast');
    this.dayForecast = this.storage.getWeather('day_forecast');

    //Fetch new information
    this.weatherService.getCurrent(this.location.key).subscribe(current => {
      this.current = current;
      this.storage.setWeather(current, 'current');
    });
    this.weatherService.getForecast(this.location.key).subscribe(forecast => {
      this.forecast = forecast;
      this.storage.setWeather(forecast, 'forecast');
    });
    this.weatherService.getDayForecast(this.location.key).subscribe(forecast => {
      this.dayForecast = forecast;
      this.storage.setWeather(forecast, 'day_forecast');
    })
  }

  onToggleSettings():void {
    this.unit = this.unit === 'C' ? 'F' : 'C';
    this.convertTemp(this.unit);
  }

  convertTemp(toUnit:string):void {
    this.current.temp = Math.round(toUnit === 'F' ? (this.current.temp * 9 / 5) + 32 : (this.current.temp - 32) * 5 / 9);
    this.forecast.forEach(fc => {
      fc.temp = Math.round(toUnit === 'F' ? (fc.temp * 9 / 5) + 32 : (fc.temp - 32) * 5 / 9);
    });
    this.dayForecast.forEach(dfc => {
      dfc.temp = Math.round(toUnit === 'F' ? (dfc.temp * 9 / 5) + 32 : (dfc.temp - 32) * 5 / 9);
    });
  }

}
