import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from '../web-api.service';

var apiUrl = "https://localhost:7042/api";
var httpLink = {
  getCount: apiUrl+"/Dashboard",
  membersBasedOnSkills: "https://localhost:7042/api/TeamMember/getTeamMemberBasedOnSkills/count",
  
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private webApiService: WebApiService) { }
  public getAllCount(): Observable<any> {
    return this.webApiService.get(httpLink.getCount);
  }
  public getMembersBasedOnSkills(): Observable<any> {
    return this.webApiService.get(httpLink.membersBasedOnSkills);
  }
}
