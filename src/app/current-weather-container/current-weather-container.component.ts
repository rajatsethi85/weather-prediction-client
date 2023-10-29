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

@Component({
  selector: 'app-current-weather-container',
  templateUrl: './current-weather-container.component.html',
  styleUrls: ['./current-weather-container.component.scss']
})
export class CurrentWeatherContainerComponent implements OnInit {
  currentWeatherReport?: CurrentWeather;
  weatherForcastHourly?: any;
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
    // this.forecast("Delhi");
  }

  ngOnInit(): void {
  }

  forecast(cityName: any) {
    this.currentWeatherReport = {};
    this.weatherReportAvailable = false;
    this.weatherReportService.fetchWeatherReport(cityName).subscribe((resp) => {
      this.error = false;
      this.weatherForcastHourly = resp.weatherForecastDetails[0];

      const currentTimestamp = Date.now();
      const timestampList: any[] = this.weatherForcastHourly.map((timestamp: { dt: string }) => new Date(timestamp.dt));
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

      const nearestTimestampWeatherForecast = this.weatherForcastHourly
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
      if (error.status === 401) {
        this.errorMessage = "Invalid API key. Check with owner.";
      } else if (error.status === 404) {
        this.weatherReportService.setData(null);
        this.errorMessage = "City not found";
      } else if(error.status === 504) {
        // this.weatherReportService.setData(null);
        this.errorMessage = "Please check you internet.";
      }
      this.error = true;
    });
  }

}
