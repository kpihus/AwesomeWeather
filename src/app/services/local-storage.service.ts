import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";
import {Location} from "../models/location";
import {Weather} from "../models/Weather";
import {WeatherDayforecast} from "../models/weather-dayforecast";

const STORAGE_PREFIX = 'awesome-weather';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { }

  static getKey(type:string):string{
    return `${STORAGE_PREFIX}_${type}`
  }

  setLocation(location: Location):void{
    this.storage.set(LocalStorageService.getKey('location'), JSON.stringify(location))
  }

  getLocation():Location{
    const data = this.storage.get(LocalStorageService.getKey('location'));
    if(!data){
      return {name: null, key: null}
    }
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('Unable to parse stored location item');
    }
  }

  setWeather(data:Weather|Weather[]|WeatherDayforecast[], type:string):void{
    this.storage.set(LocalStorageService.getKey(type), JSON.stringify(data));
  }

  getWeather(type:string){
    const data = this.storage.get(LocalStorageService.getKey(type));
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Unable to parse stored weather data');
    }
  }
}
