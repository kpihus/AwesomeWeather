import {Component, OnInit} from '@angular/core';
import {Location} from "../../models/location";
import {LocalStorageService} from "../../services/local-storage.service";
import {Router} from "@angular/router";
import {CommunicationService} from "../../services/communication.service";
import {ApiLocation} from "../../models/apiLocation";
import {ViewEncapsulation} from "@angular/core";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LocationComponent implements OnInit {
  public url = '//dataservice.accuweather.com/locations/v1/cities/autocomplete';
  public params = {
    apikey: environment.apikey,
  };
  public location:Location = {name: '', key: null};

  constructor(private storage:LocalStorageService, private router:Router, private communicationService:CommunicationService) {
  }

  ngOnInit() {
  }

  handleResultSelected(result) {
    this.location = {
      name: `${result.LocalizedName}, ${result.Country.LocalizedName}`,
      key: result.Key
    };
    this.storage.setLocation(this.location);
    this.router.navigate(['/'])
  }

  useBrowserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.communicationService.getLocationByGeopos({lat: position.coords.latitude, lon: position.coords.longitude})
          .subscribe((result:ApiLocation) => {
            const location:Location = {
              name: `${result.LocalizedName}, ${result.Country.ID}`,
              key: parseInt(result.Key)
            };
            this.storage.setLocation(location);
            this.router.navigate(['/'])
          })

      })
    }
  }

}
