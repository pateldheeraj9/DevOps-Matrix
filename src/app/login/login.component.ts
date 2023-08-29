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
  loginError: boolean;
  errorMsg: string = "";

  ngOnInit(){
    
  }
  onLogin(){
    
    this.loginService.authenticate(this.username, this.password).subscribe((response)=>{
      console.log(response);
      if(response && response.value){
        let responseString = atob(response.value);
        this.loginService.isAuthenticated = true;
        this.loginService.userRole = responseString.split(':')[1];
        this.loginService.userName = responseString.split(':')[0];
        sessionStorage.setItem('userName',this.loginService.userName);
        sessionStorage.setItem('userRole',this.loginService.userRole);
        this.router.navigate(["Dashboard"]);
      }
      else {
        this.errorMsg = "Invalid Credentials";
        this.loginError = true;
      }
      
    });
    
  }

}
