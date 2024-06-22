import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
// import p-card and p-button
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CardModule, ButtonModule, TimelineModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent {
  events: any[] = [
    {
      status: 'Ordered',
      date: '15/10/2020 10:30',
      icon: 'pi pi-shopping-cart',
      color: '#9C27B0',
      image: 'game-controller.jpg',
    },
    {
      status: 'Processing',
      date: '15/10/2020 14:00',
      icon: 'pi pi-cog',
      color: '#673AB7',
    },
    {
      status: 'Shipped',
      date: '15/10/2020 16:15',
      icon: 'pi pi-envelope',
      color: '#FF9800',
    },
    {
      status: 'Delivered',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
    },
  ];
}
