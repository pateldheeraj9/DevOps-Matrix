import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { WebApiService } from '../web-api.service';




var apiUrl = "https://localhost:7042/api";




var httpLink = {

 getAllTeamDetails: apiUrl+"/TeamMember",

 saveMember: apiUrl+"/TeamMember",
 getMemberid:apiUrl+"/TeamMember",
  updateMemberedit:apiUrl+"/TeamMember",
  deleteMemberbyid:apiUrl+"/TeamMember",

  getAllTeamMember:apiUrl+"/TeamMember",
  dropdownTeamDetails:apiUrl+"/TeamDetail",
  teamMemberRemarks:apiUrl+"/TeamMemberRemarks",

  teamMemberSkill:apiUrl+'/TeamMemberSkills'
}




@Injectable({

 providedIn: 'root'

})

export class TeamMemberDetailsService {
//  deleteMemberById(id: any) {
//    throw new Error('Method not implemented.');
//  }




 constructor( private webApiService: WebApiService) { }




 public getAllDetails(): Observable<any> {

  return this.webApiService.get(httpLink.getAllTeamDetails);

 }

 public getAllDetailss(): Observable<any> {

  return this.webApiService.get(httpLink.getAllTeamMember);

 }

 public SaveMember(data: any) {

  return this.webApiService.post(httpLink.saveMember, data);

 } 
 public updateMember(data:any,id: any) {
    return this.webApiService.put(httpLink.updateMemberedit+'/'+id,data);
  }  

  public getMemberById(id: any): Observable<any> {
    return this.webApiService.get(httpLink.getMemberid + '/' + id);
  }



  

  public deleteMemberById(id: any): Observable<any> {
    return this.webApiService.Delete(httpLink.deleteMemberbyid + '/' + id );
  }
 public getAllDropdownTeamDetails(): Observable<any> {

      return this.webApiService.get(httpLink.dropdownTeamDetails);
    
     }

     public getTeamMemberRemarks(id : any) : Observable<any>{
      return this.webApiService.get(httpLink.teamMemberRemarks + '/' + id );
     }

     public postTeamMemberRemarks(data:any) : Observable<any>{
      return this.webApiService.post(httpLink.teamMemberRemarks, data);
     }

     public deleteTeamMemberRemarks(id:any) : Observable<any>{
      return this.webApiService.Delete(httpLink.teamMemberRemarks+ '/byId/' + id);
     }

     public getTeamMemberSkills(id : any) : Observable<any>{
      return this.webApiService.get(httpLink.teamMemberSkill + '/' + id );
     }

     public postTeamMemberSkill(data:any) : Observable<any>{
      return this.webApiService.post(httpLink.teamMemberSkill, data);
     }

     public deleteTeamMemberSkill(id:any) : Observable<any>{
      return this.webApiService.Delete(httpLink.teamMemberSkill+ '/byId/' + id);
     }

}




