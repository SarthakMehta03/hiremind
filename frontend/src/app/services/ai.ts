import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AiService {

  apiUrl =
    'http://localhost:5000/api/ai';

  constructor(
    private http: HttpClient
  ) {}

  getHeaders() {

    const token =
      localStorage.getItem('token');

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      })

    };

  }

  // MATCH CANDIDATES
  getMatches(jobId: string) {

    return this.http.get(

      `${this.apiUrl}/match/${jobId}`,

      this.getHeaders()

    );

  }

}