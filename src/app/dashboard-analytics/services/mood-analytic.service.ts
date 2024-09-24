import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {MoodAnalytic} from "../model/mood-analytic.entity";
import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MoodAnalyticService extends BaseService<MoodAnalytic> {

  constructor() {
    super();
    this.resourceEndpoint='/patient-mood-analytic'
  }

  //array because the query parameter always return an array
  findByDate(month: string, year: string){
    return this.http.get<MoodAnalytic[]>(`${this.resourcePath()}?month=${month}&year=${year}`, this.httpOptions)
      .pipe(map((response => response.length ? response [0] : null )))
  }


}