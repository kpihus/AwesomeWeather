import {Component, OnInit} from '@angular/core';
import {Weather} from '../../models/Weather'
import {WeatherService} from '../../services/weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecast:Weather[];
  current:Weather;
  location:string = 'Kehtna';
  unit:string = 'C';

  constructor(private weatherService: WeatherService) {
  }

  static mapIcon(apiIcon) {
    const iconMap = {
      '01d': 'wi-day-sunny',
      '02d': 'wi-day-cloudy',
      '03d': 'wi-cloud',
      '04d': 'wi-cloudy',
      '09d': 'wi-rain-wind',
      '10d': 'wi-day-rain',
      '11d': 'wi-day-lightning',
      '13d': 'wi-snow',
      '50d': 'wi-fog',
      '01n': 'wi-night-clear',
      '02n': 'wi-night-alt-cloudy',
      '03n': 'wi-cloud',
      '04n': 'wi-cloudy',
      '09n': 'wi-rain-wind',
      '10n': 'wi-night-alt-rain',
      '11n': 'wi-night-lightning',
      '13n': 'wi-snow',
      '50n': 'wi-fog'
    };
    return iconMap[apiIcon]
  }

  ngOnInit() {
    this.weatherService.getCurrent(this.location).subscribe(current => {
      this.current = {
        day: moment(current.dt * 1000).format('dddd, MMMM Do YYYY'),
        temp: Math.round(current.main.temp),
        icon: WeatherComponent.mapIcon(current.weather[0].icon),
        description: current.weather[0].description
      };
    });
    this.weatherService.getForecast(this.location).subscribe(forecast => {
      this.forecast = forecast.list.filter(forecastItem => {
        return forecastItem.dt_txt.indexOf('12:00:00') > -1
      }).map(df => {
        return {
          day: moment(df.dt_txt).format('dddd'),
          icon: WeatherComponent.mapIcon(df.weather[0].icon),
          temp: Math.round(df.main.temp)
        }
      })
    })
  }

  onToggleSettings(){
    this.unit = this.unit === 'C' ? 'F' : 'C';
    this.convertTemp(this.unit);
  }

  convertTemp(toUnit){
    this.current.temp = Math.round(toUnit === 'F' ? (this.current.temp * 9/5) + 32 : (this.current.temp - 32)* 5 / 9);
    this.forecast.forEach(fc => {
      fc.temp = Math.round(toUnit === 'F' ? (fc.temp * 9/5) + 32 : (fc.temp - 32)* 5 / 9);
    })
  }

}
