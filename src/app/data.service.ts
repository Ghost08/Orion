import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getFormattedDocument(petitionNo: string) {

    return this._http.get(environment.apibaseurl + 'api/docx/formatData?Petition_No=' + petitionNo);
  }

  savePetitionData(petitionData: any) {
    return this._http.post(environment.apibaseurl + 'api/petition/saveData', petitionData);
  }

  fetchAllPetitionData() {
    return this._http.get(environment.apibaseurl + 'api/petition/fetchData');
  }

  fetchPetitionData(petitionNo: string) {
    return this._http.get(environment.apibaseurl + 'api/petition/fetchData?Petition_No=' + petitionNo)
  }

}
