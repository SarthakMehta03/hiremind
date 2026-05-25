import {
  Component,
  OnInit
} from '@angular/core';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

import { NavbarComponent }
from '../../components/navbar/navbar';

import { DashboardService }
from '../../services/dashboard';

import {
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    SidebarComponent,
    NavbarComponent
  ],

  templateUrl: './dashboard.html',

  styleUrls: ['./dashboard.css']
})

export class DashboardComponent
implements OnInit {

  totalJobs = 0;

  totalCandidates = 0;

  totalInterviews = 0;

  totalHires = 0;

  constructor(

  private dashboardService:
  DashboardService,

  private cdr:
  ChangeDetectorRef

) {}

  ngOnInit(): void {

    this.fetchStats();

  }

  // FETCH STATS
  fetchStats() {

  this.dashboardService
  .getStats()
  .subscribe({

    next: (res: any) => {

      this.totalJobs =
        res.totalJobs;

      this.totalCandidates =
        res.totalCandidates;

      this.totalInterviews =
        res.totalInterviews;

      this.totalHires =
        res.totalHires;

      // FORCE UI REFRESH
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

}