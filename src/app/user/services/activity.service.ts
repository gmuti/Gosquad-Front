import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { activitiesApiKey } from '../../../firebase-config';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private apiKey = activitiesApiKey;
  private baseUrl = 'https://api.opentripmap.com/0.1/en/places';

  constructor(private http: HttpClient) {}

  getCityCoordinates(city: string): Observable<any> {
    const url = `${this.baseUrl}/geoname?name=${city}&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

  getActivitiesByRadius(
    lon: number,
    lat: number,
    radius: number = 5000,
    limit: number = 50
  ): Observable<any> {
    const url = `${this.baseUrl}/radius?radius=${radius}&lon=${lon}&lat=${lat}&apikey=${this.apiKey}&lang=fr&rate=1&limit=${limit}`;
    return this.http.get(url);
  }

  getActivityDetails(xid: string): Observable<any> {
    const url = `${this.baseUrl}/xid/${xid}?apikey=${this.apiKey}&lang=fr`;
    return this.http.get(url);
  }
}
