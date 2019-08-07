import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {WeatherComponent} from "./components/weather/weather.component";
import {LocationComponent} from "./components/location/location.component";

const routes:Routes = [
  {path: '', component: WeatherComponent},
  {path: 'location', component: LocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
