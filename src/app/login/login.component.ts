import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { AuthService } from '../auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData: any = {};
  errorData: any = {};

  constructor(private _router: Router, 
              private _authservice: AuthService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {

    if(this._authservice.loggedIn()){
      this._router.navigate(["home"]);
    }
  }

  doLogin() {
    this.spinner.show();
    this._authservice.authenticateUser(this.loginUserData).subscribe((res) => {
      this.spinner.hide();
      if (res["status"] === "success") {
        let authData = res["data"];
        localStorage.setItem("token", authData["token"]);
        localStorage.setItem("userName", authData["userName"]);
        this.toastr.info(authData["userName"],"Welcome!!");
        this._router.navigate(["home"]);
      }
      else {
        this.toastr.error("Authentication Failed");
      }
    }, (err) => {
      this.spinner.hide();
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastr.error("Authentication Failed");
        }
        else {
          this.toastr.error("Sorry !! An error occured..");         
        }
      }
    });

  }
}

