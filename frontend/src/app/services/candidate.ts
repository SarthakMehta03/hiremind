import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CandidateService {

  apiUrl =
    'http://localhost:5000/api/candidates';

  constructor(private http: HttpClient) {}

  // HEADERS
  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`

      })

    };

  }

  // CREATE
  createCandidate(candidateData: any) {

    return this.http.post(

      this.apiUrl,

      candidateData,

      this.getHeaders()

    );

  }

  // GET
  getCandidates() {

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }

  updateCandidate(
  id: string,
  candidateData: any
) {

  return this.http.put(

    `${this.apiUrl}/${id}`,

    candidateData,

    this.getHeaders()

  );

  }
  // DELETE
  deleteCandidate(id: string) {

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}