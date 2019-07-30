import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {

  constructor() { }

  getForecast(){
    return [
      {
        day: 'Monday',
        temp: 11,
        icon: 'wi-night-sleet'
      },
      {
        day: 'Tuesday',
        temp: 16,
        icon: 'wi-day-cloudy'
      },
      {
        day: 'Wendsday',
        temp: 15,
        icon: 'wi-day-snow'
      },
      {
        day: 'Thursday',
        temp: 14,
        icon: 'wi-night-alt-rain'
      },
      {
        day: 'Friday',
        temp: 15,
        icon: 'wi-night-alt-sleet-storm'
      }
    ]
  }
}
