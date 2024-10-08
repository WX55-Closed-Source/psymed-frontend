import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { SessionService } from "../../services/session.service";
import { Session } from "../../model/sesion.entity";
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCard, MatCardContent } from "@angular/material/card";
import { formatDate } from '@angular/common'; // Import this utility

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCard
  ],
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css']
})
export class AppointmentPageComponent implements OnInit, AfterViewInit {

  protected columnsToDisplay: string[] = ['id', 'idProfessional', 'patientName', 'appointmentDate', 'sessionTime'];
  protected dataSource!: MatTableDataSource<Session>;

  @ViewChild(MatSort) sort!: MatSort;

  private sessionService = inject(SessionService);

  constructor() {
    this.dataSource = new MatTableDataSource<Session>();
  }

  ngOnInit(): void {
    this.getAllSessions(); // Fetch sessions when the component initializes
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // Fetch all sessions
  private getAllSessions(): void {
    this.sessionService.getAll().subscribe((sessions: Session[]) => {
      this.dataSource.data = sessions;
    });
  }

  // Method to calculate the end time
  calculateEndTime(appointmentDate: string, sessionTime: number): string {
    const startTime = new Date(appointmentDate);
    const endTime = new Date(startTime.getTime() + sessionTime * 60 * 60 * 1000); // Add sessionTime in hours

    // Format the end time as 'shortTime'
    return formatDate(endTime, 'shortTime', 'en-US');
  }
}
