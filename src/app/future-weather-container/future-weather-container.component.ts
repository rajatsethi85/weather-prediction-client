import {Component, OnInit} from '@angular/core';
import {OpenWeatherService} from "../services/open-weather.service";
import {faSun, faThunderstorm, faUmbrella, faWind} from "@fortawesome/free-solid-svg-icons";
import {WeatherReport} from "../interfaces/weather-report";

@Component({
  selector: 'app-future-weather-container',
  templateUrl: './future-weather-container.component.html',
  styleUrls: ['./future-weather-container.component.scss']
})

/**
 * Component to show the future dates weather report.
 */
export class FutureWeatherContainerComponent implements OnInit {
  forecastReportAvailable?: boolean = false;
  weatherReport?: WeatherReport;
  faUmbrella: any = faUmbrella;
  faSun: any = faSun;
  faThunderstorm: any = faThunderstorm;
  faWind: any = faWind;

  constructor(private weatherForecastService: OpenWeatherService) {
  }

  ngOnInit(): void {
    this.weatherForecastService.dataSubject.subscribe((report) => {
      this.forecastReportAvailable = false;
      this.weatherReport = {};
      this.weatherReport = report;
      this.forecastReportAvailable = report !== null;
    });
  }
}
