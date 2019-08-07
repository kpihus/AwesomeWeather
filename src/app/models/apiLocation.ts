export interface ApiLocation {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: RegionOrCountry;
  Country: RegionOrCountry;
  AdministrativeArea: AdministrativeArea;
  TimeZone: TimeZone;
  GeoPosition: GeoPosition;
  IsAlias: boolean;
  SupplementalAdminAreas?: (SupplementalAdminAreasEntity)[] | null;
  DataSets?: (string)[] | null;
}
export interface RegionOrCountry {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
}
export interface AdministrativeArea {
  ID: string;
  LocalizedName: string;
  EnglishName: string;
  Level: number;
  LocalizedType: string;
  EnglishType: string;
  CountryID: string;
}
export interface TimeZone {
  Code: string;
  Name: string;
  GmtOffset: number;
  IsDaylightSaving: boolean;
  NextOffsetChange: string;
}
export interface GeoPosition {
  Latitude: number;
  Longitude: number;
  Elevation: Elevation;
}
export interface Elevation {
  Metric: MetricOrImperial;
  Imperial: MetricOrImperial;
}
export interface MetricOrImperial {
  Value: number;
  Unit: string;
  UnitType: number;
}
export interface SupplementalAdminAreasEntity {
  Level: number;
  LocalizedName: string;
  EnglishName: string;
}
