export interface ApiWeatherForecast {
  Headline: Headline;
  DailyForecasts?: (DailyForecastsEntity)[] | null;
}
export interface Headline {
  EffectiveDate: string;
  EffectiveEpochDate: number;
  Severity: number;
  Text: string;
  Category: string;
  EndDate: string;
  EndEpochDate: number;
  MobileLink: string;
  Link: string;
}
export interface DailyForecastsEntity {
  Date: string;
  EpochDate: number;
  Temperature: Temperature;
  Day: DayOrNight;
  Night: DayOrNight;
  Sources?: (string)[] | null;
  MobileLink: string;
  Link: string;
}
export interface Temperature {
  Minimum: MinimumOrMaximum;
  Maximum: MinimumOrMaximum;
}
export interface MinimumOrMaximum {
  Value: number;
  Unit: string;
  UnitType: number;
}
export interface DayOrNight {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string | null;
  PrecipitationIntensity?: string | null;
}
