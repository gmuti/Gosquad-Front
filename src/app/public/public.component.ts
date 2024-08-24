import { Component } from '@angular/core';
import { TimelineComponent } from './timeline/timeline.component';
import { Router } from '@angular/router';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';
@Component({
  selector: 'app-public',
  standalone: true,
  imports: [TimelineComponent, MapComponent, FooterComponent],
  templateUrl: './public.component.html',
  styleUrl: './public.component.css',
})
export class PublicComponent {
  constructor(private router: Router) {}

  navigateToAuth() {
    this.router.navigate(['/login']);
  }
  navigateToAide() {
    this.router.navigate(['/aide']);
  }
}
