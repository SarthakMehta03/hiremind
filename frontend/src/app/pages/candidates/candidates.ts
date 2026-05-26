import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import { FormsModule }
from '@angular/forms';

import { SidebarComponent }
from '../../components/sidebar/sidebar';

import { NavbarComponent }
from '../../components/navbar/navbar';

import { CandidateService }
from '../../services/candidate';

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

  selectedResume:
    File | null = null;

  resumePath = '';

  editingCandidateId = '';

  isEditing = false;

  constructor(

    private candidateService:
    CandidateService,

    private cdr:
    ChangeDetectorRef

  ) {}

  ngOnInit(): void {

    this.fetchCandidates();

  }

  // FETCH CANDIDATES
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

  // CREATE CANDIDATE
  createCandidate() {

    // IF RESUME EXISTS
    if (this.selectedResume) {

      this.candidateService
      .uploadResume(
        this.selectedResume
      )
      .subscribe({

        next: (uploadRes: any) => {

          this.resumePath =
            uploadRes.filePath;

          // AUTO-FILL SKILLS
          this.skills =
            uploadRes.extractedSkills.join(',');

          this.saveCandidate();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

    else {

      this.saveCandidate();

    }

  }

  // SAVE CANDIDATE
  saveCandidate() {

    const candidateData = {

      name: this.name,

      email: this.email,

      skills:
        this.skills.split(','),

      experience:
        this.experience,

      resume:
        this.resumePath

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

  // EDIT
  editCandidate(candidate: any) {

    this.isEditing = true;

    this.editingCandidateId =
      candidate._id;

    this.name =
      candidate.name;

    this.email =
      candidate.email;

    this.skills =
      candidate.skills.join(',');

    this.experience =
      candidate.experience;

    this.resumePath =
      candidate.resume;

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

  // FILE SELECT
  onFileSelected(event: any) {

    this.selectedResume =
      event.target.files[0];

  }

  // RESET FORM
  resetForm() {

    this.name = '';

    this.email = '';

    this.skills = '';

    this.experience = '';

    this.selectedResume = null;

    this.resumePath = '';

    this.isEditing = false;

    this.editingCandidateId = '';

  }

  // TRACK BY
  trackByCandidate(
    index: number,
    candidate: any
  ) {

    return candidate._id;

  }

}