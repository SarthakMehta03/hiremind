import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl: './sidebar.html',

  styleUrls: ['./sidebar.css']
})

export class SidebarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isCollapsed = false;

  toggleSidebar() {

    this.isCollapsed =
      !this.isCollapsed;

  }

  logout() {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

}