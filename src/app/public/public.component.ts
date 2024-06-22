import { Component } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';
import { RouterModule, Router } from '@angular/router';
import { MapComponent } from './map/map.component';
@Component({
  selector: 'app-public',
  standalone: true,
  imports: [TimelineComponent, MapComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/login']);
  }
}
