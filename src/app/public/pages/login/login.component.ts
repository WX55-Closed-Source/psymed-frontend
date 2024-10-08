import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Store} from "@ngrx/store";
import {setPatientId, setRole} from '../../../store/auth/auth.actions'
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {selectPatientId} from "../../../store/auth/auth.selectors";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    MatCardContent,
    MatCard,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private store: Store) {}


  sendProfessionalDataToStore(rolid: string ): void {
    // Dispatch the action to send rolid to the store
    console.log(rolid)
    this.store.dispatch(setRole({ rolid }));
  }

  sendPatientDataToStore(rolid: string, patientId: number): void {
    console.log(rolid)
    console.log(patientId)

    this.store.dispatch(setRole({ rolid }));
    this.store.dispatch(setPatientId({ patientId }));
  }
}
