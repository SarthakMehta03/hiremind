import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JobService {

  apiUrl = 'http://localhost:5000/api/jobs';

  constructor(private http: HttpClient) {}

  // GET TOKEN HEADERS
  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization: `Bearer ${token}`

      })

    };

  }

  // CREATE JOB
  createJob(jobData: any) {

    return this.http.post(
      this.apiUrl,
      jobData,
      this.getHeaders()
    );

  }

  // GET JOBS
  getJobs() {

    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );

  }

  // DELETE JOB
  deleteJob(id: string) {

    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );

  }

  updateJob(id: string, jobData: any) {

  return this.http.put(

    `${this.apiUrl}/${id}`,

    jobData,

    this.getHeaders()

  );

}

}