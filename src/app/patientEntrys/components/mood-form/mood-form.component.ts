import { Component, OnInit } from '@angular/core';
import {MoodState} from "../../models/mood-state.entity";
import {MoodStateService} from "../../services/mood-state.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../../../store/auth/auth.state";
import {map, Observable} from "rxjs";
import {selectPatientId} from "../../../store/auth/auth.selectors";

@Component({
  selector: 'app-mood-form',
  standalone: true,
  imports: [],
  templateUrl: './mood-form.component.html',
  styleUrl: './mood-form.component.css'
})
export class MoodFormComponent implements OnInit {
  patientId!: number | null; // Define the patient ID as a number
  currentDate: string = "hoy xd";
  patientId$!: Observable<number | null>;


  constructor(private moodStateService: MoodStateService,
              private store: Store<AuthState>) {
  }
  ngOnInit(): void {

    console.log("on init");
    this.patientId$ = this.store.select(selectPatientId);
    this.patientId$.subscribe(patientId => {
      this.patientId = patientId;
      console.log('Patient Id:', this.patientId);
    })

    // this.patientId = +this.route.snapshot.paramMap.get('patientId')!; // Get the patient ID from the route using the ActivatedRoute service
    // console.log("Patient ID:", this.patientId); // Log the patient ID to the console for security
  }


  selectMood(mood: number) {
    this.patientId$.pipe(
      map((patientId) => {
        if(patientId !== null) {
          this.moodStateService.getMoodStatesByPatientId(patientId).subscribe(moodStates => {
            const existingMood = moodStates.find(m => m.createdAt === this.currentDate);
            if (existingMood) {
              alert('You already have a mood recorded for today.');
            } else {
              const newMood = new MoodState(1, patientId, mood, this.currentDate);
              this.moodStateService.createMoodState(newMood, patientId).subscribe(() => {
                window.location.reload();
              });
            }
          });
        } else {
          alert('Patient ID unavailable');
        }
      })
    ).subscribe();
  }
}
