import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { WebApiService } from '../web-api.service';

var apiUrl = "https://localhost:7042/api";
var httpLink = {
getTeamDetailBarchart: apiUrl+"/Chart",
 
}

@Injectable({

  providedIn: 'root'
 
 })
 
export class GraphService {

  constructor( private webApiService: WebApiService) { }

  public getTdBarChart(): Observable<any> {
    return this.webApiService.get(httpLink.getTeamDetailBarchart);
  }

}
