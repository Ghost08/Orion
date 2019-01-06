import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient, private _router: Router) { }


  authenticateUser(loginData: any) {
    return this._http.post(environment.apibaseurl + "api/user/login", loginData);
  }

  getLoggedInUserName() {
    return (localStorage.getItem("userName")) != null ? localStorage.getItem("userName") : "";
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {

    return (localStorage.getItem("token")) != null ? localStorage.getItem("token") : "";
  }

  logoutUser() {
    localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }


}
