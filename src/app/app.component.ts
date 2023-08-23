import { Component } from '@angular/core';
import { LoginService } from './Service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'New Tech';
  constructor(public loginService:LoginService){

  }
}
