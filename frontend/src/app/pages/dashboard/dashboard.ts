import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,

  template: `
    <h1>Dashboard</h1>
    <p>Welcome to HireMind AI</p>
  `
})

export class DashboardComponent {
  logout() {

  localStorage.removeItem('token');

}
}
