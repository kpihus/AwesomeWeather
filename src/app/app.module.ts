import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import {NgxTypeaheadModule} from "ngx-typeahead";

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import {CommunicationService} from './services/communication.service';
import { LocationComponent } from './components/location/location.component'
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherItemComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxTypeaheadModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
