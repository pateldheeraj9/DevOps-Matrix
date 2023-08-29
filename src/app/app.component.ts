import { Component } from '@angular/core';
import { LoginService } from './Service/login/login.service';
import {Role} from './models/role.enum'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'New Tech';
  Role = Role;
  constructor(public loginService:LoginService, public messageService: MessageService){
    this.loginService.restrictAccessSubject.subscribe((message)=>{
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: message,
        life: 30000,
        sticky: true
      });
    })
  }

  
}
