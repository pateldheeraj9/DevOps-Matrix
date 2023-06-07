import { Injectable,Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,map,catchError } from 'rxjs';
import { ISprint } from '../models/common.model';

interface ICompletedTasks{
  date:string;
  count:number;
}
interface User {
  name: string;
  EmpId: number;
}
@Injectable({
  providedIn: 'root'
})
export class PerformanceServiceService {
  sprints:any[]=[];
  baseUrl:string="";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
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
  getSprintPlannedHr(sprintList:ISprint[]){
    return this.http.post<Observable<ISprint[]>>(this.baseUrl + 'performance/GetSprintPlannedHr/',sprintList)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getSprintActualHr(sprintList:ISprint[]){
    return this.http.post<Observable<ISprint[]>>(this.baseUrl + 'performance/GetSprintActualHr/',sprintList)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getSprintTotalPoints(sprintList:ISprint[]){
    return this.http.post<Observable<ISprint[]>>(this.baseUrl + 'performance/GetSprintTotalPoints/',sprintList)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getUserTotalHour(EmpId:number,strDate:string,endDate:string):Observable<any>{
    return this.http.get<Observable<User[]>>(this.baseUrl + 'performance/GetEmployeeTotalHour/'+EmpId+
    '?strDate='+strDate+'&endDate='+endDate)
      .pipe(map((resp: any) => resp),
        catchError(error => error));
  }
  getSprintRemainingEffort(sprintList:ISprint[]){
    return this.http.post<Observable<ISprint[]>>(this.baseUrl + 'performance/GetSprintRemainingEfforts/',sprintList)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
  getUserRemainingEffort(EmpId:number,strDate:string,endDate:string):Observable<any>{
    return this.http.get<Observable<User[]>>(this.baseUrl + 'performance/GetEmployeeRemainingEffort/'+EmpId+
    '?strDate='+strDate+'&endDate='+endDate)
      .pipe(map((resp: any) => resp),
        catchError(error => error));
  }
  getSprintDeviations(sprintList:ISprint[]){
    return this.http.post<Observable<ISprint[]>>(this.baseUrl + 'performance/GetDeviatedWorkItems/',sprintList)
      .pipe(map((resp: any) => resp),
        catchError(error => error))
  }
}
