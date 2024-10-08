import { Injectable } from "@angular/core";
import { Medication } from "../models/medication.entity";
import { BaseService } from '../../shared/services/base.service';
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MedicationService extends BaseService<Medication>{


  constructor() {
    super();
    this.resourceEndpoint = '/medications';

  }

  public createMedication(medication: Medication,patientId:number): Observable<Medication> {
    console.log("Creating medication...");
    medication.patientId = patientId;
    return this.create(medication);
  }
  public getMedicationsByPatientId(patientId: number): Observable<Medication[]> {
    console.log(`Fetching medications for patientId: ${patientId}...`);
    const url = `${this.resourcePath()}?patientId=${patientId}`;
    return this.http.get<Medication[]>(url, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
