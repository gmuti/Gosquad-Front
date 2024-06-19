// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { onAuthStateChanged } from '@firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          subscriber.next(true);
          subscriber.complete();
        } else {
          this.router.navigate(['/login']);
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });
  }
}
