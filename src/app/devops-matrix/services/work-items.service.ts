import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { IWorkItem, IWorkItemTask } from '../models/workItem.model';

@Injectable({
  providedIn: 'root'
})
export class WorkItemsService {
  sprints: any[] = [];
  // baseUrl: string = "";
  baseUrl: string = "https://localhost:7042/";
  constructor(private http: HttpClient
    // , @Inject('BASE_URL') baseUrl: string
    ) {
    this.http = http;
  }  

  getData(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/Getdata', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getWorkItems(): Observable<any> {
    return this.http.get<IWorkItem[]>(this.baseUrl + 'workitembystate/GetWorkItems')
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getWorkItemsBySprint(params: HttpParams): Observable<any> {
    return this.http.get<IWorkItemTask[]>(this.baseUrl + 'workitembystate/GetWorkItemsBySprint', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getEmployeeWorkItemCountByStatus(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/GetEmployeeWorkItemCountByStatus', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getEmployeeTaskCountByStatus(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/GetEmployeeTaskCountByStatus', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getWorkItemTaskData(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/GetWorkItemTasksData', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getWorkItemDetails(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/GetWorkItemDetails', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }

  getWorkItemTaskDetails(params: HttpParams): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'workitembystate/getWorkItemTaskDetails', { params: params })
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
