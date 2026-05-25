import { Component, Input } from '@angular/core';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [CommonModule],

  templateUrl: './sidebar.html',

  styleUrls: ['./sidebar.css']
})

export class SidebarComponent {

  constructor(private router: Router) {}

  @Input() isOpen = true;

  isCollapsed = false;

  toggleSidebar() {

    this.isCollapsed = !this.isCollapsed;

  }

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }

}