import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated = false;
  userRole: string;
  user: User;
  constructor() { }

  authenticate(username: string, password: string){

    if(username === password){
      return of(true);
    }else
      return of(false);
  }
}
