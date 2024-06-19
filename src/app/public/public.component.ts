import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-public',
  standalone: true,
  imports: [],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/login']);
  }
}
