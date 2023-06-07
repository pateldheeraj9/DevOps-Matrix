import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private userSource$ = new BehaviorSubject<number>(0);

  user = this.userSource$.asObservable();

  constructor() { }

  setUser(user:any):void {
    this.userSource$.next(user);
  }

}