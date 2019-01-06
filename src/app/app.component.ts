import { Component } from '@angular/core';
import {AuthService} from './auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TemplateHelperApp';
  isLoggedIn: any;

  constructor(private _authService : AuthService){
    
  }

  checkLoggedIn(){
    
    return this._authService.loggedIn();
  }

  getloggedInUser(){
    return this._authService.getLoggedInUserName();
  }
  
  logoutUser(){
    this._authService.logoutUser();
  }
}
