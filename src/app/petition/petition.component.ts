import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

import { Router, ActivatedRoute } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-petition',
  templateUrl: './petition.component.html',
  styleUrls: ['./petition.component.css']
})
export class PetitionComponent implements OnInit {

  petitionData: any = {};
  petitionerData: any = {};
  deceasedData: any = {};
  propertyData: any = {};
  private Petition_No: string = "";

  isPetition: boolean = false;

  constructor(private _dataService: DataService,
    private _route: ActivatedRoute,
    private _router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }


  ngOnInit() {
    this._route.params.subscribe(params => {
      this.Petition_No = params["Petition_No"];
    });

    if (this.Petition_No != null) {
      this.isPetition = true;

      this.spinner.show();

      this._dataService.fetchPetitionData(this.Petition_No).subscribe(res => {
        let response = res;
        this.spinner.hide();
        console.log(response);
        if (response["status"] === "success") {
          let savedpetitionData = response["data"];
          this.petitionData = savedpetitionData;
          //this.petitionerData = savedpetitionData.Petitioners[0];
          this.deceasedData = savedpetitionData.DeceasedDetails;
          this.propertyData = savedpetitionData.PropertyDetails;
        }

      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    }
  }

  openPetitionerModal(){
    document.getElementById("btnopenPetitionerModal").click();
    this.petitionerData = {};
  }

  addPetitioner() {

    if (this.petitionerData.Petitioner_Name == null || this.petitionerData.Petitioner_Name == undefined) {
      this.toastr.warning("Provide Petitioner Name");
    }
    else {

      if (this.petitionData.Petitioners == null) {
        this.petitionData.Petitioners = [];
      }

      if (this.petitionerData.Pet_Id != null) {
        this.petitionData.Petitioners = this.petitionData.Petitioners.filter(f => f["Pet_Id"] != this.petitionerData.Pet_Id);
      }

      this.petitionData.Petitioners.push(this.petitionerData);
      this.petitionerData = {};
      this.closePetitionerModal();
    }
  }

  editPetitioner(index) {
    if (this.petitionData.Petitioners != null && this.petitionData.Petitioners.length > 0) {
      this.petitionerData = Object.assign({}, this.petitionData.Petitioners[index]);
      document.getElementById("btnopenPetitionerModal").click();
    }
  }

  deletePetitioner(index) {
    if (confirm("Are you sure ?")) {
      if (this.petitionData.Petitioners != null && this.petitionData.Petitioners.length > 0) {
        this.petitionData.Petitioners.splice(index, 1);
      }
    }
  }

  closePetitionerModal() {
    this.petitionerData = {};
    document.getElementById("btnclosePetitionerModal").click();
  }

  private validateForm() {

    if (this.petitionData.Petition_No == null || this.petitionData.Petition_No == undefined) {
      this.toastr.warning("Provide Petition Number");
      return false;
    }

    if (this.petitionData.Petition_Year == null || this.petitionData.Petition_Year == undefined) {
      this.toastr.warning("Provide Petition Year");
      return false;
    }


    if (this.petitionData.Petition_Type == null || this.petitionData.Petition_Type == undefined) {
      this.toastr.warning("Provide Petition Type");
      return false;
    }

    if (this.petitionData.Date_Of_Petition == null || this.petitionData.Date_Of_Petition == undefined) {
      this.toastr.warning("Provide Petition Date");
      return false;
    }

    if (this.deceasedData.Deceased_Name == null || this.deceasedData.Deceased_Name == undefined) {
      this.toastr.warning("Provide Deceased Name");
      return false;
    }

    if (this.deceasedData.Date_Of_Death == null || this.deceasedData.Date_Of_Death == undefined) {
      this.toastr.warning("Provide Date of Death");
      return false;
    }

    if (this.petitionData.Petitioners == null || this.petitionData.Petitioners == undefined) {
      this.toastr.warning("Provide Petitioners");
      return false;
    }

    return true;

  }

  saveData() {
    if (this.validateForm()) {
      this.spinner.show();
      //this.petitionData.Petitioners = [];
      //this.petitionData.Petitioners.push(this.petitionerData);
      this.petitionData.DeceasedDetails = this.deceasedData;
      this.petitionData.PropertyDetails = this.propertyData;


      this._dataService.savePetitionData(this.petitionData).subscribe(res => {
        this.spinner.hide();
        let response = res;
        console.log(response);
        if (response["status"] === "success") {

          this.toastr.success("Petition details saved");

          this._router.navigate(["home"]);

          let petition_No = response["data"];
          console.log(petition_No);
        }
        else {
          this.toastr.error("An error occured");
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      })
    }
  }

}
