import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Service/login/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public loginService: LoginService,public  router: Router, private fb: FormBuilder){}

  username: string;
  password: string;

  ngOnInit(){
    
  }
  onLogin(){
    
    this.loginService.authenticate(this.username, this.password).subscribe((response)=>{
      console.log(response);
      this.loginService.isAuthenticated = true;
      this.loginService.userRole = this.username;
      this.router.navigate(["Dashboard"])
    });
    
  }

}
