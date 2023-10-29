import {Component, OnInit} from '@angular/core';
import {OpenWeatherService, weatherReport} from "../services/open-weather.service";
import {faUmbrella, faCloud, faCloudRain, faSun, faThunderstorm, faWind} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-future-weather-container',
  templateUrl: './future-weather-container.component.html',
  styleUrls: ['./future-weather-container.component.scss']
})
export class FutureWeatherContainerComponent implements OnInit {
  forecastReportAvailable?: boolean = false;
  weatherReport?: weatherReport;
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
    } );
  }
}
