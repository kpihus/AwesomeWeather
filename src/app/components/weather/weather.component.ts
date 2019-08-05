import {Component, OnInit} from '@angular/core';
import {Weather} from '../../models/Weather'
import {WeatherService} from '../../services/weather.service';
import {WeatherDayforecast} from "../../models/weather-dayforecast";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass']
})
export class WeatherComponent implements OnInit {
  forecast: Weather[];
  current: Weather;
  dayForecast: WeatherDayforecast[];
  location: string = '130271';
  unit: string = 'C';

  constructor(private weatherService: WeatherService) {
  }


  ngOnInit() {
    this.weatherService.getCurrent(this.location).subscribe(current => {
      this.current = current;
    });
    this.weatherService.getForecast(this.location).subscribe(forecast => {
      this.forecast = forecast
    });
    this.weatherService.getDayForecast(this.location).subscribe(forecast => {
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
