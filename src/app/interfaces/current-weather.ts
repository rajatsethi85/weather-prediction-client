export interface CurrentWeather {
  temperature?: number;
  dateTime?: string;
  description?: string;
  tooHot?: boolean;
  raining?: boolean;
  highWinds?: boolean;
  thunderStorm?: boolean;
  cityName?: string,
  cityCountry?: string,
  rainChancesPercentage?: number,
  rainChances?: boolean,
}
