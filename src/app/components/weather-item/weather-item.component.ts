import {Component, OnInit, Input} from '@angular/core';
import {Weather} from '../../models/Weather'

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.css']
})
export class WeatherItemComponent implements OnInit {
  @Input() day: Weather;

  constructor() {
  }

  ngOnInit() {
  }

  // setWeatherIcon(){
  //   console.log('ICON');
  //   let classes = {
  //     wi: true,
  //     'wi-day-sunny': true
  //   };
  //   return classes;
  // }
}
