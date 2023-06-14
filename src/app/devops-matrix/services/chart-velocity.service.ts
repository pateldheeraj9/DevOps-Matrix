import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { ISprintVelocity } from '../models/ISprintVelocity';

@Injectable({
  providedIn: 'root'
})
export class ChartVelocityService {
  sprints: any[] = [];
  // baseUrl: string = "";
  baseUrl: string = "https://localhost:7042/";
  constructor(private http: HttpClient
    // , @Inject('BASE_URL') baseUrl: string
  ) {
    this.http = http;
  }

  getSprintVelocityDetails(sprintUIDs: string[]): Observable<any> {
    return this.http.post<Observable<ISprintVelocity[]>>(this.baseUrl + 'Velocity/GetSprintVelocityDetails/', sprintUIDs)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getSprintWorkItemsCountByStatus(sprintUIDs: string[]): Observable<any> {
    return this.http.post<Observable<ISprintVelocity[]>>(this.baseUrl + 'Velocity/GetSprintWorkItemsCountByStatus/', sprintUIDs)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
