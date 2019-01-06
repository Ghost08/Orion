import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';
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

  isPetition : boolean = false;

  constructor(private _dataService: DataService, private _route: ActivatedRoute,
    private _router: Router,private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {

    this._route.params.subscribe(params => {
      this.Petition_No = params["Petition_No"];
    });

    if(this.Petition_No!=null){
      this.isPetition = true;
      
      this.spinner.show();

      this._dataService.fetchPetitionData(this.Petition_No).subscribe(res => {
        let response = res;
        this.spinner.hide();
        console.log(response);
        if (response["status"] === "success") {
          let savedpetitionData = response["data"];
          this.petitionData = savedpetitionData;
          this.petitionerData= savedpetitionData.Petitioners[0];
          this.deceasedData = savedpetitionData.DeceasedDetails;
          this.propertyData =savedpetitionData.PropertyDetails;
  
        }
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    }
  }

  

  saveData() {
    if (this.petitionData) {
      this.spinner.show();
      this.petitionData.Petitioners = [];
      this.petitionData.Petitioners.push(this.petitionerData);
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
        else{
          this.toastr.error("An error occured");
        }
      }, err => {
        this.spinner.hide();
        console.log(err);
      })
    }
  }

}
