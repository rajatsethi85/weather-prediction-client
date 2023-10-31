import {Component, OnInit} from '@angular/core';
import {
  faCloud,
  faCloudRain,
  faEarth,
  faMagnifyingGlass,
  faSun,
  faThunderstorm,
  faWind,
  faUmbrella,
} from '@fortawesome/free-solid-svg-icons';
import {OpenWeatherService} from "../services/open-weather.service";
import {CurrentWeather} from "../interfaces/current-weather";

/**
 * Component to show the current weather report.
 */
@Component({
  selector: 'app-current-weather-container',
  templateUrl: './current-weather-container.component.html',
  styleUrls: ['./current-weather-container.component.scss']
})
export class CurrentWeatherContainerComponent {
  currentWeatherReport?: CurrentWeather;
  weatherForecastHourly?: any;
  weatherReportAvailable?: boolean = false;
  errorMessage?: string;
  error?: boolean;
  cityName?: any;
  faMagnifyingGlass: any = faMagnifyingGlass;
  faSearchLocation: any = faEarth;
  faCloud: any = faCloud;
  faCloudRain: any = faCloudRain;
  faSun: any = faSun;
  faThunderstorm: any = faThunderstorm;
  faWind: any = faWind;
  faUmbrella: any = faUmbrella;

  constructor(private weatherReportService: OpenWeatherService) {
    // When app starts, just showing the weather forecast of city Delhi.
    this.forecast("Delhi");
  }

  /**
   * Method to fetch the weather report from server and show it to UI.
   */
  forecast(cityName: any) {
    this.weatherReportService.setData(null);
    this.currentWeatherReport = {};
    this.weatherReportAvailable = false;
    this.weatherReportService.fetchWeatherReport(cityName).subscribe((resp) => {
      this.error = false;
      this.weatherForecastHourly = resp.weatherForecastDetails[0];

      const currentTimestamp = Date.now();
      const timestampList: any[] = this.weatherForecastHourly.map((timestamp: { dt: string }) => new Date(timestamp.dt));
      let nearestTimestamp: number = 0;
      let minTimeDifference: number = 0;

      // Iterate through the list of timestamps
      for (const timestamp of timestampList) {
        const timeDifference = Math.abs(timestamp - currentTimestamp);

        // If no nearest timestamp found yet or if the current timestamp is closer
        if (nearestTimestamp === 0 || timeDifference < minTimeDifference!) {
          nearestTimestamp = timestamp;
          minTimeDifference = timeDifference;
        }
      }
      const nearestDate = new Date(nearestTimestamp);
      const nearestHour = nearestDate.getHours();

      // Just for the more clarity, here we are getting the nearest result for weather form the current time
      // from the list of weather report of full day.
      const nearestTimestampWeatherForecast = this.weatherForecastHourly
        .filter((hourly: {
          dt: { toString: () => string | string[]; };
        }) => (hourly.dt.toString().includes(nearestHour.toString())));


      this.currentWeatherReport = {
        temperature: nearestTimestampWeatherForecast[0].main.temp,
        dateTime: nearestTimestampWeatherForecast[0].date,
        description: nearestTimestampWeatherForecast[0].weather[0].description,
        tooHot: nearestTimestampWeatherForecast[0].weather[0].tooHot,
        raining: nearestTimestampWeatherForecast[0].weather[0].raining,
        highWinds: nearestTimestampWeatherForecast[0].weather[0].highWinds,
        thunderStorm: nearestTimestampWeatherForecast[0].weather[0].thunderStorm,
        cityName: resp.city.name,
        cityCountry: resp.city.country,
        rainChancesPercentage: nearestTimestampWeatherForecast[0].clouds.all,
        rainChances: nearestTimestampWeatherForecast[0].clouds.all > 60,
      };
      this.weatherReportAvailable = true;
      this.weatherReportService.setData(resp);
    }, (error) => {
      this.weatherReportService.setData(null);
      if (error.status === 401) {
        this.errorMessage = "Invalid API key. Check with owner.";
      } else if (error.status === 404) {
        this.errorMessage = "City not found";
      } else if (error.status === 504) {
        this.errorMessage = "Please check you internet.";
      }
      this.error = true;
    });
  }
}
