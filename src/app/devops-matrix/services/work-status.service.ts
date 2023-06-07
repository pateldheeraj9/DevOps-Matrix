import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, pipe } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { ISeverityCount, ISprintStatus, IUserStoryCount } from '../models/common.model';

@Injectable({
  providedIn: 'root'
})

export class WorkStatusService {
  baseUrl: any;
  formdata: any;

  constructor(private _http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getStatusCountData(sprintUIDs: string[]): Observable<any> {
    var res;
    let param = new HttpParams();
    // param = param.append("sprintUID", sprintUID);
    res = this._http.post<Observable<ISprintStatus[]>>(this.baseUrl + 'WorkStatus/GetStatusCountData', sprintUIDs);
    console.log(res);
    return res;

  }

  getUserStoryPointsByStatusNEmployees(sprintUID: any) {
    var res;
    let param = new HttpParams();
    param = param.append("sprintUID", sprintUID);
    res = this._http.get<any>(this.baseUrl + 'TeamPerformance/GetUserStoryPointsByStatusNEmployees', { params: param });
    console.log(res);
    return res;
  }

  getUserStoryPointsByEmployees(sprintUID: any) {
    var res;
    let param = new HttpParams();
    param = param.append("sprintUID", sprintUID);
    res = this._http.get<any[]>(this.baseUrl + 'TeamPerformance/GetUserStoryPointsByEmployees', { params: param });
    console.log(res);
    return res;
  }
  getSprintsSeverityCount(sprintUIDs: string[]): Observable<any> {
    return this._http.post<Observable<ISeverityCount[]>>(this.baseUrl + 'WorkStatus/GetBugSeverityCount', sprintUIDs)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getSprintsPointsCount(sprintUIDs: string[]): Observable<any> {
    return this._http.post<Observable<IUserStoryCount[]>>(this.baseUrl + 'WorkStatus/GetUserStoryPointsCount', sprintUIDs)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getBugsCountBySeverityNEmployees(sprintUID: any) {
    var res;
    let param = new HttpParams();
    param = param.append("sprintUID", sprintUID);
    res = this._http.get<any[]>(this.baseUrl + 'TeamPerformance/GetBugsCountBySeverityNEmployees', { params: param });
    console.log(res);
    return res;
  }

  getBugsCountByEmployees(sprintUID: any) {
    var res;
    let param = new HttpParams();
    param = param.append("sprintUID", sprintUID);
    res = this._http.get<any[]>(this.baseUrl + 'TeamPerformance/GetBugsCountByEmployees', { params: param });
    console.log(res);
    return res;
  }
}
