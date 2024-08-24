import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; // Assurez-vous d'avoir le bon chemin

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  userProfile: any;
  currentRoute: string = 'home';

  menuItems = [
    { icon: 'fas fa-home', title: 'Accueil', route: 'home' },
    { icon: 'fas fa-users', title: 'Groupes', route: 'groups' },
    { icon: 'fa-solid fa-sack-dollar', title: 'Budget', route: 'budget' },
    { icon: 'fa-solid fa-earth-africa', title: 'Plan', route: 'plan' },
    {
      icon: 'fa-solid fa-magnifying-glass',
      title: 'Recherche',
      route: 'search',
    },
    { icon: 'fa-solid fa-ticket', title: 'Billets', route: 'tickets' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.userProfile = user;
    });

    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url.split('/')[2]; // Adaptation si nécessaire pour extraire la route
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigateTo(route: string) {
    this.router.navigate([`/user/${route}`]);
    this.currentRoute = route; // Met à jour la route actuelle
  }

  getDisplayName(): string {
    if (this.userProfile?.displayName) {
      const [firstName, lastName] = this.userProfile.displayName.split(' ');
      return `${firstName} ${lastName ? lastName[0].toUpperCase() : ''}`;
    }
    return '';
  }

  logout() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/public']);
    });
  }
}
