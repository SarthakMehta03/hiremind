import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { JobService } from '../../services/job';

import { SidebarComponent } from '../../components/sidebar/sidebar';

import { NavbarComponent } from '../../components/navbar/navbar';

import { ChangeDetectorRef } from '@angular/core';

import { AiService } from '../../services/ai';

@Component({
  selector: 'app-jobs',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],
  templateUrl: './jobs.html',

  styleUrls: ['./jobs.css']
})

export class JobsComponent
implements OnInit {

  jobs: any[] = [];
  matchedCandidates: any[] = [];
  selectedJobId = '';
  title = '';
  company = '';
  location = '';
  salary = '';
  editingJobId = '';
 isEditing = false;
 skillsRequired = '';

  constructor(
  private jobService: JobService,
  private cdr: ChangeDetectorRef,
  private aiService: AiService
) {}

  ngOnInit(): void {

    this.fetchJobs();

  }

  // FETCH JOBS
  fetchJobs() {

  this.jobService.getJobs()
  .subscribe({

    next: (res: any) => {

      this.jobs = res;

      // Force UI refresh
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.log(err);

    }

  });

  }

  // CREATE JOB
  createJob() {

  const jobData = {

  title: this.title,

  company: this.company,

  location: this.location,

  salary: this.salary,

  skillsRequired:
    this.skillsRequired.split(',')

};

  // UPDATE
  if (this.isEditing) {

    this.jobService.updateJob(
      this.editingJobId,
      jobData
    )
    .subscribe({

      next: () => {

        alert('Job Updated');

        this.resetForm();

        this.fetchJobs();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // CREATE
  else {

    this.jobService.createJob(jobData)
    .subscribe({

      next: () => {

        alert('Job Created');

        this.resetForm();

        this.fetchJobs();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}

  // DELETE JOB
  deleteJob(id: string) {

    this.jobService.deleteJob(id)
    .subscribe({

      next: () => {

        alert('Job Deleted');

        this.fetchJobs();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  trackByJob(index: number, job: any) {

  return job._id;

}

findMatches(jobId: string) {

  this.selectedJobId = jobId;

  this.aiService
  .getMatches(jobId)
  .subscribe({

    next: (res: any) => {

      this.matchedCandidates = res;

    },

    error: (err) => {

      console.log(err);

    }

  });

}

editJob(job: any) {

  this.isEditing = true;

  this.editingJobId = job._id;

  this.title = job.title;

  this.company = job.company;

  this.location = job.location;

  this.salary = job.salary;

}

resetForm() {

  this.title = '';

  this.company = '';

  this.location = '';

  this.salary = '';

  this.isEditing = false;

  this.editingJobId = '';

  this.skillsRequired = '';

}

}