import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChartWorkAnalysisService {
  // baseUrl: any;
  baseUrl: string = "https://localhost:7042/";
  formdata: any;

  constructor(private http: HttpClient
    // , @Inject('BASE_URL') baseUrl: string
    ) {
    // this.baseUrl = baseUrl;
  }

  getUserStoryAnalysis(sprintUIDs: string[], team1EmployeeIds: number[], team2EmployeeIds: number[]): Observable<any> {
    const data = { 'SprintUIDs': sprintUIDs, 'Team1EmployeeIds': team1EmployeeIds, 'Team2EmployeeIds': team2EmployeeIds };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post<Observable<any[]>>(this.baseUrl + 'WorkAnalysis/GetUserStoryAnalysis', data, config)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getBugsAnalysis(sprintUIDs: string[], team1EmployeeIds: number[], team2EmployeeIds: number[]): Observable<any> {
    const data = { 'SprintUIDs': sprintUIDs, 'Team1EmployeeIds': team1EmployeeIds, 'Team2EmployeeIds': team2EmployeeIds };
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post<Observable<any[]>>(this.baseUrl + 'WorkAnalysis/GetBugsAnalysis', data, config)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
