import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService
        .signInWithEmail(email, password)
        .then(() => {
          this.errorMessage = ''; // Effacer le message d'erreur en cas de succès
          this.router.navigate(['/user']);
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'Mot de passe incorrect. Veuillez réessayer.';
          } else if (error.code === '/user-not-found') {
            this.errorMessage =
              "Aucun utilisateur trouvé avec cet email. Veuillez vous inscrire d'abord.";
          } else {
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
          }
          console.error('Erreur de connexion :', error);
        });
    }
  }

  loginWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then(() => {
        this.errorMessage = ''; // Effacer le message d'erreur en cas de succès
        this.router.navigate(['/user']);
      })
      .catch((error) => {
        this.errorMessage =
          'Une erreur est survenue lors de la connexion avec Google. Veuillez réessayer.';
        console.error('Erreur de connexion avec Google :', error);
      });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
