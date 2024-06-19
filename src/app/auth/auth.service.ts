// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/user']);
      } else {
        this.router.navigate(['/public']);
      }
    });
  }

  signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signInWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/public']);
    });
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
