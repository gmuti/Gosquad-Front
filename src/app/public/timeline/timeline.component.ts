import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
// import p-card and p-button
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { text } from 'stream/consumers';

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
      status: 'Créer un groupe',
      date: '15/10/2020 10:30',
      icon: 'pi pi-shopping-cart',
      color: '#9C27B0',
      image: '../../../assets/img/illustration2.jpg',
      text: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Ajouter des amis',
      date: '15/10/2020 14:00',
      icon: 'pi pi-cog',
      color: '#673AB7',
      image: '../../../assets/img/illustration.png',
      text: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Choisir la destination',
      date: '15/10/2020 16:15',
      icon: 'pi pi-envelope',
      color: '#FF9800',
      image: '../../../assets/img/illustration2.jpg',
      text: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Choisir des activités ',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
      image: '../../../assets/img/illustration.png',
      text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Organiser le budget',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
      image: '../../../assets/img/illustration2.jpg',
      text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Payer vos billets',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
      image: '../../../assets/img/illustration.png',
      text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Reserver vos vacances',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
      text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
    {
      status: 'Partez !!',
      date: '16/10/2020 10:00',
      icon: 'pi pi-check',
      color: '#607D8B',
      image: '../../../assets/img/illustration2.jpg',
      text: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    },
  ];
}
