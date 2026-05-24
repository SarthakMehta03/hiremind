import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../services/auth';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],

  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}



  login() {

    const userData = {
      email: this.email,
      password: this.password
    };

    this.authService
      .login(userData)
      .subscribe({

        next: (res) => {

          this.authService.saveToken(
            res.token
          );

          alert('Login Successful');

          this.router.navigate(['/dashboard']);

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}