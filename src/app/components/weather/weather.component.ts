import {Component, OnInit} from '@angular/core';
import {Weather} from '../../models/Weather'
import {CommunicationService} from '../../services/communication.service';
import {WeatherDayforecast} from "../../models/weather-dayforecast";
import {Location} from "../../models/location";
import {LocalStorageService} from "../../services/local-storage.service";

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

  constructor(private weatherService:CommunicationService, private storage:LocalStorageService) {
  }


  ngOnInit() {
    this.location = this.storage.getLocation();
    this.weatherService.getCurrent(this.location.key).subscribe(current => {
      this.current = current;
    });
    this.weatherService.getForecast(this.location.key).subscribe(forecast => {
      this.forecast = forecast
    });
    this.weatherService.getDayForecast(this.location.key).subscribe(forecast => {
      this.dayForecast = forecast;
    })
  }

  onToggleSettings() {
    this.unit = this.unit === 'C' ? 'F' : 'C';
    this.convertTemp(this.unit);
  }

  convertTemp(toUnit) {
    this.current.temp = Math.round(toUnit === 'F' ? (this.current.temp * 9 / 5) + 32 : (this.current.temp - 32) * 5 / 9);
    this.forecast.forEach(fc => {
      fc.temp = Math.round(toUnit === 'F' ? (fc.temp * 9 / 5) + 32 : (fc.temp - 32) * 5 / 9);
    });
    this.dayForecast.forEach(dfc => {
      dfc.temp = Math.round(toUnit === 'F' ? (dfc.temp * 9 / 5) + 32 : (dfc.temp - 32) * 5 / 9);
    })
  }

}
