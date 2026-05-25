import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

import { NavbarComponent }
from '../../components/navbar/navbar';

import { CandidateService }
from '../../services/candidate';

import {
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-candidates',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    NavbarComponent
  ],

  templateUrl: './candidates.html',

  styleUrls: ['./candidates.css']
})

export class CandidatesComponent
implements OnInit {

  candidates: any[] = [];

  name = '';
  email = '';
  skills = '';
  experience = '';

 constructor(

  private candidateService:
  CandidateService,

  private cdr:
  ChangeDetectorRef

) {}

  ngOnInit(): void {

    this.fetchCandidates();

  }

  // FETCH
  fetchCandidates() {

  this.candidateService
  .getCandidates()
  .subscribe({

    next: (res: any) => {

      this.candidates = res;

      // FORCE UI REFRESH
      this.cdr.detectChanges();

    },

    error: (err) => {

      console.log(err);

    }

  });

}

  // CREATE
  createCandidate() {

  const candidateData = {

    name: this.name,

    email: this.email,

    skills:
      this.skills.split(','),

    experience:
      this.experience

  };

  // UPDATE
  if (this.isEditing) {

    this.candidateService
    .updateCandidate(

      this.editingCandidateId,

      candidateData

    )
    .subscribe({

      next: () => {

        alert(
          'Candidate Updated'
        );

        this.fetchCandidates();

        this.resetForm();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // CREATE
  else {

    this.candidateService
    .createCandidate(candidateData)
    .subscribe({

      next: () => {

        alert(
          'Candidate Added'
        );

        this.fetchCandidates();

        this.resetForm();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}

  editingCandidateId = '';

  isEditing = false;

  editCandidate(candidate: any) {

  this.isEditing = true;

  this.editingCandidateId =
    candidate._id;

  this.name = candidate.name;

  this.email = candidate.email;

  this.skills =
    candidate.skills.join(',');

  this.experience =
    candidate.experience;

  }

  // DELETE
  deleteCandidate(id: string) {

    this.candidateService
    .deleteCandidate(id)
    .subscribe({

      next: () => {

        alert(
          'Candidate Deleted'
        );

        this.fetchCandidates();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // RESET
  resetForm() {

  this.name = '';

  this.email = '';

  this.skills = '';

  this.experience = '';

  this.isEditing = false;

  this.editingCandidateId = '';

}

}