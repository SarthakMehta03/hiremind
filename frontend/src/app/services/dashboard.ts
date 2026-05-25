import { Injectable }
from '@angular/core';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  apiUrl =
    'http://localhost:5000/api/dashboard';

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

  // GET STATS
  getStats() {

    return this.http.get(

      `${this.apiUrl}/stats`,

      this.getHeaders()

    );

  }

}