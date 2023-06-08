import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { ISprint } from '../models/common.model';
import { IUser } from '../models/IUser';
import { ISprintTotalPoints } from '../models/ISprintTotalPoints';
import { environment } from '../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  sprints: any[] = [];
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
  }

  getSprints(): Observable<any> {
    return this.http.get<Observable<ISprint[]>>(this.baseUrl + 'common/GetSprints')
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getAllEmployees(): Observable<any> {
    return this.http.get<Observable<IUser[]>>(this.baseUrl + 'performance/GetAllEmployees')
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getCurrentSprint(): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + 'performance/GetCurrentSprint')
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getCurrentSprintWorkItem(sprintUID: string): Observable<any> {
    return this.http.get<Observable<ISprintTotalPoints[]>>(this.baseUrl + 'performance/GetCurrentSprintWorkItemCount/' + sprintUID)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
