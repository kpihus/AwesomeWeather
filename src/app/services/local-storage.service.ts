import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";
import {Location} from "../models/location";

const STORAGE_PREFIX = 'awesome-weather';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage:StorageService) { }

  static getKey(type:string):string{
    return `${STORAGE_PREFIX}_${type}`
  }

  public setLocation(location: Location){
    this.storage.set(LocalStorageService.getKey('location'), JSON.stringify(location))
  }

  public getLocation():Location{
    const result = this.storage.get(LocalStorageService.getKey('location'));
    try {
      return JSON.parse(result)
    } catch (e) {
      console.error('Unable to parse stored location item')
    }
  }
}
