import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth/auth.component';
import path from 'node:path';

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent },
  { path: 'user', component: UserComponent },
  { path: 'auth', component: AuthComponent },
];
