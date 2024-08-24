import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  displayName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .registerWithEmail(this.email, this.password)
      .then((userCredential) => {
        return this.authService.updateUserData(userCredential.user?.uid, {
          displayName: this.displayName,
          email: this.email,
          photoUrl: '',
        });
      })
      .then(() => {
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        console.error('Error registering:', error);
      });
  }
}
