import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiWeatherForecast, DailyForecastsEntity} from "../models/ApiWeatherForecast";
import {ApiWeatherCurrent} from "../models/ApiWeatherCurrent";
import {ApiWeatherHistory} from "../models/apiweather-history";
import {ApiWeatherForecast12} from "../models/apiweather-forecast12h";
import {WeatherDayforecast} from "../models/weather-dayforecast";
import {ApiLocation} from "../models/apiLocation";
import {Weather} from "../models/Weather";
import * as moment from "moment";
import {environment} from "../../environments/environment";

@Injectable()
export class CommunicationService {
  weatherUrl: string = 'http://dataservice.accuweather.com';
  apiKey: string = environment.apikey;

  constructor(private http: HttpClient) {
  }

  static mapIcon(apiIcon) {
    const iconMap = {
      1: 'wi-day-sunny',
      2: 'wi-day-sunny',
      3: 'wi-day-sunny',
      4: 'wi-day-cloudy',
      5: 'wi-day-cloudy',
      6: 'wi-day-cloudy',
      7: 'wi-cloud',
      8: 'wi-cloudy',
      11: 'wi-fog',
      12: 'wi-showers',
      13: 'wi-day-rain',
      14: 'wi-day-sleet',
      15: 'wi-thunderstorm',
      16: 'wi-day-sleet-storm',
      17: 'wi-day-sleet-storm',
      18: 'wi-rain',
      19: 'wi-snow',
      20: 'wi-day-snow',
      21: 'wi-day-snow',
      22: 'wi-snow',
      23: 'wi-day-snow',
      24: 'wi-windy',
      25: 'wi-sleet',
      26: 'wi-hail',
      29: 'wi-rain-mix',
      30: 'wi-thermometer',
      31: 'wi-thermometer-exterior',
      32: 'wi-strong-wind',
      33: 'wi-night-clear',
      34: 'wi-night-clear',
      35: 'wi-night-partly-cloudy',
      36: 'wi-night-alt-cloudy',
      37: 'wi-night-fog',
      38: 'wi-night-cloudy',
      39: 'wi-night-showers',
      40: 'wi-night-showers',
      41: 'wi-night-alt-storm-showers',
      42: 'wi-night-alt-showers',
      43: 'wi-night-alt-snow',
      44: 'wi-night-alt-snow'
    };
    return iconMap[apiIcon]
  }

  getForecast(location): Observable<Weather[]> {
    return new Observable<Weather[]>((observer) => {
      this.http.get<ApiWeatherForecast>(`${this.weatherUrl}/forecasts/v1/daily/5day/${location}?apikey=${this.apiKey}&metric=true`)
        .toPromise()
        .then((data: ApiWeatherForecast) => {
          const forecast = data.DailyForecasts.map((df: DailyForecastsEntity) => {
            return {
              day: moment(df.Date).format('dddd'),
              icon: CommunicationService.mapIcon(df.Day.Icon),
              temp: Math.round(df.Temperature.Maximum.Value)
            }
          });
          observer.next(forecast);
        })
    })
  }

  getCurrent(location): Observable<Weather> {
    return new Observable<Weather>((observer) => {
      this.http.get<ApiWeatherCurrent>(`${this.weatherUrl}/currentconditions/v1/${location}?apikey=${this.apiKey}`)
        .toPromise()
        .then((weather: ApiWeatherCurrent) => {
          const data = {
            day: moment(weather[0].LocalObservationDateTime).format('dddd, MMMM Do YYYY'),
            temp: Math.round(weather[0].Temperature.Metric.Value),
            icon: CommunicationService.mapIcon(weather[0].WeatherIcon),
            description: weather[0].WeatherText
          };
          observer.next(data);
        })
    })

  }

  getDayForecast(location): Observable<WeatherDayforecast[]> {
    return new Observable<WeatherDayforecast[]>((observer) => {
      Promise.all([
        this.http.get<ApiWeatherHistory[]>(`${this.weatherUrl}/currentconditions/v1/${location}/historical/24?apikey=${this.apiKey}`)
          .toPromise(),
        this.http.get<ApiWeatherForecast12[]>(`${this.weatherUrl}/forecasts/v1/hourly/12hour/${location}?apikey=${this.apiKey}&metric=true`)
          .toPromise()
      ])
        .then(([history, forecast]) => {
          const mappedHistorical:WeatherDayforecast[] = history.map(d => {
            return {
              dateTime: d.LocalObservationDateTime,
              temp: Math.round(d.Temperature.Metric.Value)
            }
          });

          const mappedForecast:WeatherDayforecast[] = forecast.map(d => {
            return {
              dateTime: d.DateTime,
              temp: Math.round(d.Temperature.Value)
            }
          });

          const data:WeatherDayforecast[] = mappedHistorical
            .concat(mappedForecast)
            .filter(CommunicationService.filterOutImportantDatapoints)
            .sort(CommunicationService.sortDatapointsByTime)
            .map(d => {
              return Object.assign(d, {dayTime: CommunicationService.formatDaytime(d.dateTime)});
            });

          observer.next(data);
        })
    })
  }
  getLocationByGeopos(position):Observable<ApiLocation>{
    return this.http.get<ApiLocation>(`${this.weatherUrl}/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${position.lat},${position.lon}`)
  }

  //Helper functions
  static filterOutImportantDatapoints(data):boolean {
    //Filter out important times
    const currentday = moment().format('DD');
    const nextDay = moment().add(1, 'days').format('DD');
    const hour = moment(data.dateTime).format('HH');
    const date = moment(data.dateTime).format('DD');
    return ['06' + currentday, '12' + currentday, '18' + currentday, '00' + nextDay].indexOf(hour + date) > -1;
  }

  static sortDatapointsByTime(a, b):number {
    const diff = moment(a.dateTime).diff(moment(b.dateTime));
    if (diff < 0) {
      return -1
    }
    if (diff > 0) {
      return 1
    }
    return 0;
  }

  static formatDaytime(timeString:string):string{
    const hour = moment(timeString).format('HH');
    switch (hour) {
      case '06':
        return 'Morning';
      case '12':
        return 'Day';
      case '18':
        return 'Evening';
      case '00':
        return 'Night';
    }
  }
}
