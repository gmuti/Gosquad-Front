import { Component } from '@angular/core';
import { Group } from '../group.model';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css',
})
export class BudgetComponent {
  @Input() selectedGroup: Group | null = null;
}
