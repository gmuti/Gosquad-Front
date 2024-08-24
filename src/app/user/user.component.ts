import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../public/footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FooterComponent, SidebarComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: any;
  isUserMenuVisible: boolean = false;
  isCollapsed = false;

  userGroups = [
    {
      title: 'Voyage à Bali',
      date: '12 Juillet 2024',
      location: 'Bali',
      membersCount: 2,
      image: 'assets/img/teste.jpg',
    },
    {
      title: 'Safari en famille',
      date: '12 Juillet 2024',
      location: 'Kenya',
      membersCount: 7,
      image: 'assets/img/teste.jpg',
    },
  ]; // Placeholder for user groups
  propositions = [
    {
      title: 'ACTIVITÉ AQUATIQUE',
      description: 'Bali dévoilé : Des aventures inoubliables vous attendent !',
      image: 'assets/img/teste.jpg',
    },
    {
      title: 'AUTRE ACTIVITÉ',
      description: 'Bali : Massage traditionnel balinais à votre domicile',
      image: 'assets/img/teste.jpg',
    },
    {
      title: 'AVENTURES',
      description: 'Bali : Ubud Jungle, rivière, cascade et tunnel en quad',
      image: 'assets/img/teste.jpg',
    },
  ]; // Placeholder for propositions

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      // Load user groups here if needed
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleUserMenu() {
    this.isUserMenuVisible = !this.isUserMenuVisible;
  }

  getInitials(name: string): string {
    if (!name) {
      return '';
    }
    const names = name.split(' ');
    const initials =
      names.length > 1 ? names[names.length - 1][0] : names[0][0];
    return initials.toUpperCase();
  }

  logout() {
    this.authService.signOut();
  }
}
