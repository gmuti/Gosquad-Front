import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Group } from '../group.model';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css',
})
export class StoriesComponent {
  @Input() selectedGroup: Group | null = null;
}
