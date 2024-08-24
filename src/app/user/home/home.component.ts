import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivityService } from '../services/activity.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  checklistItems = [
    { name: 'Passeport', category: 'Documents', checked: false },
    { name: 'Réserver l’hôtel', category: 'Réservations', checked: false },
    {
      name: 'Acheter les billets d’avion',
      category: 'Réservations',
      checked: false,
    },
  ];

  newChecklistItem = '';
  newCategory = '';
  selectedCategory = '';
  showAddItemForm: boolean = false;
  showAddCategoryForm: boolean = false;

  categories = ['Documents', 'Réservations', 'Autres'];

  destinations = [
    {
      name: 'Paris',
      description: 'La ville de l’amour.',
      price: 500,
      image: 'assets/img/teste.jpg',
    },
    {
      name: 'New York',
      description: 'La ville qui ne dort jamais.',
      price: 1000,
      image: 'assets/img/teste.jpg',
    },
    {
      name: 'Paris',
      description: 'La ville de l’amour.',
      price: 500,
      image: 'assets/img/teste.jpg',
    },
    {
      name: 'New York',
      description: 'La ville qui ne dort jamais.',
      price: 1000,
      image: 'assets/img/teste.jpg',
    },
    {
      name: 'Paris',
      description: 'La ville de l’amour.',
      price: 500,
      image: 'assets/img/teste.jpg',
    },
    {
      name: 'New York',
      description: 'La ville qui ne dort jamais.',
      price: 1000,
      image: 'assets/img/teste.jpg',
    },
    // Ajoutez d'autres destinations ici
  ];

  activities: any[] = [];

  groups = [
    { name: 'Famille', description: 'Voyages en famille.' },
    { name: 'Amis', description: 'Voyages entre amis.' },
    // Ajoutez d'autres groupes ici
  ];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.loadActivities('Nantes');
  }

  async loadActivities(city: string) {
    this.activityService.getCityCoordinates(city).subscribe((response: any) => {
      const { lon, lat } = response;
      this.activityService
        .getActivitiesByRadius(lon, lat, 5000, 50)
        .subscribe(async (data: any) => {
          this.activities = [];
          for (let feature of data.features) {
            const detail = await this.fetchActivityDetails(
              feature.properties.xid
            );
            this.activities.push({
              name: detail.name,
              description: detail.kinds,
              price: 200, // OpenTripMap n'inclut pas les prix
              image: detail.preview
                ? detail.preview.source
                : 'assets/img/default.png',
            });
          }
          console.log('Formatted Activities:', this.activities);
        });
    });
  }

  fetchActivityDetails(xid: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.activityService
          .getActivityDetails(xid)
          .subscribe((detail) => resolve(detail));
      }, 200); // Délai de 200 ms entre chaque requête
    });
  }

  addChecklistItem() {
    if (this.newChecklistItem && this.selectedCategory) {
      this.checklistItems.push({
        name: this.newChecklistItem,
        category: this.selectedCategory,
        checked: false,
      });
      this.newChecklistItem = '';
      this.selectedCategory = '';
      this.showAddItemForm = false;
    }
  }

  addCategory() {
    if (this.newCategory && !this.categories.includes(this.newCategory)) {
      this.categories.push(this.newCategory);
      this.newCategory = '';
      this.showAddCategoryForm = false;
    }
  }

  getChecklistItemsByCategory() {
    return this.checklistItems.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as Record<string, typeof this.checklistItems>);
  }
}
