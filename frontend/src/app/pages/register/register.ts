import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],

  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class RegisterComponent {

  name = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}



  register() {

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService
      .register(userData)
      .subscribe({

        next: (res) => {

          console.log(res);

          alert('Registration Successful');

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}