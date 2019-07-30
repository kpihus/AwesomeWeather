import {Component, OnInit} from '@angular/core';
import {Weather} from '../../models/Weather'
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecast: Weather[];

  constructor(private weatherSercice:WeatherService) {
  }

  ngOnInit() {
    this.forecast = this.weatherSercice.getForecast();
  }

}
