import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [],

  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css']
})

export class NavbarComponent {

  @Output() sidebarToggle =
    new EventEmitter<void>();

  toggleSidebar() {

    this.sidebarToggle.emit();

  }

}