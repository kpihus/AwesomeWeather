import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import {WeatherService} from './services/weather.service'

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    WeatherItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
