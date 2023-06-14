import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { ICompletedTasks } from './models/ICompletedTasks';
import { IUser } from './models/IUser';

@Injectable()
export class PerformanceServiceService {
  sprints:any[]=[];
  // baseUrl:string="";
  baseUrl: string = "https://localhost:7042/api/";
  constructor(private http: HttpClient
    // , @Inject('BASE_URL') baseUrl: string
    ) {
    this.http = http;
   }
  getdata(EmpId: number): Observable<any> {
    return this.http.get<Observable<ICompletedTasks[]>>(this.baseUrl + 'performance/GetCompletedTasks/'+EmpId)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getDataRemaining(EmpId: number): Observable<any> {
    return this.http.get<Observable<ICompletedTasks[]>>(this.baseUrl + 'performance/GetRemainingTasks/'+EmpId)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getAllEmployees(): Observable<any> {
    return this.http.get<Observable<IUser[]>>(this.baseUrl + 'performance/GetAllEmployees')
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
