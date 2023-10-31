import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {WeatherReport} from "../interfaces/weather-report";

/**
 * Service class to fetch weather report from server.
 */
@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private weatherReport?: WeatherReport;
  dataSubject = new BehaviorSubject<WeatherReport>(this.getData());

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Method to call the server api and fetch the report.
   */
  fetchWeatherReport(cityName: any): Observable<WeatherReport> {
    let params: HttpParams;
    const headers = new HttpHeaders({
      'X-API-KEY': environment.apiKey,
    });
    params = new HttpParams().set('cityName', cityName);

    return this.httpClient.get<WeatherReport>(environment.apiBaseUrl + "forecast/", {params, headers: headers});
  }

  /**
   * Set data to weather report.
   */
  setData(data: any) {
    this.weatherReport = data;
    this.dataSubject.next(data);

  }

  /**
   * Get data from weather report.
   */
  getData(): WeatherReport {
    return <WeatherReport>this.weatherReport;
  }
}
