import { Component } from '@angular/core';

import { SidebarComponent } from '../../components/sidebar/sidebar';

import { NavbarComponent } from '../../components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})

export class DashboardComponent {

}