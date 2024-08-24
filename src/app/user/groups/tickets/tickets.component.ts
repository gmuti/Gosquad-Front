import { Component } from '@angular/core';
import { Group } from '../group.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  @Input() selectedGroup: Group | null = null;
}
