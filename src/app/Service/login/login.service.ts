import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated = false;
  userRole: string | null;
  userName: string | null;
  user: User;
  public restrictAccessSubject = new BehaviorSubject('');
  constructor(private _http: HttpClient) { 
    console.log("login constructor");
    this.userName = sessionStorage.getItem('userName')? sessionStorage.getItem('userName') : "";
    this.userRole = sessionStorage.getItem('userRole')? sessionStorage.getItem('userRole') : "";
    if(this.userName && this.userRole)
      this.isAuthenticated = true;
  }

  baseUrl: string = environment.baseUrl;
  loginUrl: string = environment.loginUrl;
  
  sendRestricAccessMessage(message: string){
    return this.restrictAccessSubject.next(message);
  }
  authenticate(username: string, password: string): Observable<any> {
    let userData = {
      username,
      password
    }
    return this._http.post(this.loginUrl, userData);
  }

  logout(){
    sessionStorage.clear();
    this.userName = "";
    this.userRole = "";
    this.isAuthenticated = false;
  }
}
