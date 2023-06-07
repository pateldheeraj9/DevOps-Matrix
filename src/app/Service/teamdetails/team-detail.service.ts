import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from '../web-api.service';

var apiUrl = "https://localhost:7042/api";

var httpLink = {
  getAllTeamDetails: apiUrl+"/TeamDetail",
  saveMember: apiUrl+"/TeamMember",
  getMemberid:apiUrl+"/TeamMember",
  updateMemberedit:apiUrl+"/TeamMember",
  deleteMemberbyid:apiUrl+"/TeamMember",

  getAllTeamMember:apiUrl+"/TeamMember",
  saveTeamDetails:apiUrl+'/TeamDetail',
  getTeamDetailbyId:apiUrl+'/TeamDetail',
  updateTeamDetails:apiUrl+'/TeamDetail',
  deleteTeamDetailsById: apiUrl+'/TeamDetail'

  
  
}

@Injectable({
  providedIn: 'root'
})
export class TeamDetailService {

  constructor( private webApiService: WebApiService) { }

  public getAllDetails(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTeamDetails);
  }

  public getAllTeamMembers(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTeamMember);
  }
 
  public SaveMember(data: any) {
    return this.webApiService.post(httpLink.saveMember, data);
  }  
  public SaveTeamDetails(data: any) {
    return this.webApiService.post(httpLink.saveTeamDetails, data);
  }  
  public updateMember(data:any,id: any) {
    return this.webApiService.put(httpLink.updateMemberedit+'/'+id,data);
  }  
  public updateTeamDetails(data:any,id: any) {
    return this.webApiService.put(httpLink.updateTeamDetails+'/'+id,data);
  }  

  public getMemberById(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getMemberid + '/' + id);
  }
  public getTeamDetailById(id: any): Observable<any> {
     
    var data = this.webApiService.get(httpLink.getTeamDetailbyId + '/' + id);
    return data
  }
  public deleteTeamDetailsById(id: any): Observable<any> {
    return this.webApiService.Delete(httpLink.deleteTeamDetailsById + '/' + id);
  }

  public deleteMemberById(id: any): Observable<any> {
    return this.webApiService.Delete(httpLink.deleteMemberbyid + '/' + id);
  }


}
