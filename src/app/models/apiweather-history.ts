export interface ApiWeatherHistory {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType?: null;
  IsDayTime: boolean;
  Temperature: Temperature;
  MobileLink: string;
  Link: string;
}
export interface Temperature {
  Metric: MetricOrImperial;
  Imperial: MetricOrImperial;
}
export interface MetricOrImperial {
  Value: number;
  Unit: string;
  UnitType: number;
}
