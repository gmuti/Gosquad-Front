import { Routes } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { AideComponent } from './public/aide/aide.component';
import { HomeComponent } from './user/home/home.component';
import { GroupsComponent } from './user/groups/groups.component';
import { BudgetComponent } from './user/budget/budget.component';
import { PlanComponent } from './user/plan/plan.component';
import { SearchComponent } from './user/search/search.component';
import { TicketsComponent } from './user/tickets/tickets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'aide', component: AideComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'budget', component: BudgetComponent },
      { path: 'plan', component: PlanComponent },
      { path: 'search', component: SearchComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'not-found' },
];
