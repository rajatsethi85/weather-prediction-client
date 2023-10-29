import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from "../../environments/environment";

export interface weatherReport {
  message?: string;
  weatherForecastDetails?: any;
  city?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private weatherReport?: weatherReport;
  dataSubject = new BehaviorSubject<weatherReport>(this.getData());


  constructor(private httpClient: HttpClient) {
  }

  fetchWeatherReport(cityName: any): Observable<weatherReport> {
    let params: HttpParams;
    const headers = new HttpHeaders({
      'X-API-KEY': environment.apiKey,
    });
    params = new HttpParams().set('cityName', cityName);

    return this.httpClient.get<weatherReport>("http://localhost:8080/forecast/", {params, headers: headers});
  }

  setData(data: any) {
    this.weatherReport = data;
    this.dataSubject.next(data);

  }

  getData(): weatherReport {
    return <weatherReport>this.weatherReport;
  }
}
