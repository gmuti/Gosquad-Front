import { Component } from '@angular/core';
import { SocialIconsComponent } from '../social-icons/social-icons.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SocialIconsComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
