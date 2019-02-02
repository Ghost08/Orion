import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {


  petitionData: any = [];

  constructor(private _dataService: DataService, private _router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.spinner.show();
    this.fetchPetitionDashboardData();
  }

  private fetchPetitionDashboardData() {
    this._dataService.fetchPetitionDashboardData(true).subscribe(res => {
      this.spinner.hide();
      let response = res;
      console.log(response);
      if (response["status"] === "success") {
        this.petitionData = response["data"];
      }
      else {
        this.petitionData = [];
        this.toastr.info("no data");
      }
    }, err => {
      this.spinner.hide();
      console.log(err);
    });
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
