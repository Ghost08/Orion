import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  petitionData: any = [];

  constructor(private _dataService: DataService, private _router: Router,
    private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {

    this.spinner.show();

    this._dataService.fetchPetitionDashboardData().subscribe(res => {
      this.spinner.hide();
      let response = res;
      console.log(response);
      if (response["status"] === "success") {
        this.petitionData = response["data"];
      }
      else{
        this.toastr.error("no data");
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
  }

  editPetition(Petition_No: string) {
    this._router.navigate(["petition", Petition_No]);
  }

  downloadFile(Petition_No: string) {
    if (Petition_No) {
      this.spinner.show();
      this._dataService.getFormattedDocument(Petition_No).subscribe(res => {
        this.spinner.hide();
        let response = res;
        console.log(response);
        if (response["status"] === "success") {
          let fileToken = response["data"]["fileToken"];
          window.open(environment.apibaseurl + "api/document/download?token=" + fileToken);
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      })
    }
  }

}




