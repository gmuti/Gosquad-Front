import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ChartModule, FormsModule],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent {
  Category = [
    {
      icon: 'fa-solid fa-utensils',
      name: 'Depensés',
      value: 1000,
      pourcentage: 40,
      color1: '#72b2e9c9',
      color2: '#ffd6edc9',
    },
    {
      icon: 'fa-solid fa-utensils',
      name: 'solde restant',
      value: 1400,
      pourcentage: 60,
      color1: '#ffa19ac2',
      color2: '#ffdba2b8',
    },
    {
      icon: 'fa-solid fa-utensils',
      name: 'Epargné',
      value: 700,
      pourcentage: 5,
      color1: '#98debfba',
      color2: '#fff2b9c7',
    },
  ];

  // État pour afficher ou masquer le formulaire
  showForm = false;

  // Nouvelle dépense
  newExpense = {
    type: '',
    amount: 0,
    description: '',
  };

  // Liste des dépenses initiales
  expenses = [
    { type: 'logement', amount: 500, description: 'Loyer mensuel' },
    { type: 'nourriture', amount: 150, description: 'Épicerie' },
    { type: 'transport', amount: 100, description: 'Essence' },
    { type: 'loisir', amount: 200, description: 'Sortie cinéma' },
    { type: 'nourriture', amount: 80, description: 'Restaurant' },
    { type: 'logement', amount: 500, description: 'Loyer mensuel' },
    { type: 'nourriture', amount: 150, description: 'Épicerie' },
    { type: 'transport', amount: 100, description: 'Essence' },
    { type: 'loisir', amount: 200, description: 'Sortie cinéma' },
    { type: 'nourriture', amount: 80, description: 'Restaurant' },
  ];

  // Dépenses filtrées à afficher
  filteredExpenses = this.expenses;

  // Filtrer les dépenses par type
  filterExpenses(type: string) {
    if (type === 'all') {
      this.filteredExpenses = this.expenses;
    } else {
      this.filteredExpenses = this.expenses.filter((exp) => exp.type === type);
    }
  }

  // Ajouter une dépense à la liste
  addExpense() {
    if (
      this.newExpense.type &&
      this.newExpense.amount &&
      this.newExpense.description
    ) {
      this.expenses.push({ ...this.newExpense }); // Ajouter la dépense
      this.filteredExpenses = this.expenses; // Mettre à jour les dépenses filtrées
      this.newExpense = { type: '', amount: 0, description: '' }; // Réinitialiser le formulaire
      this.showForm = false; // Masquer le formulaire après ajout
    }
  }

  data = {
    labels: this.Category.map((item) => item.name),
    datasets: [
      {
        label: 'Budget',
        data: this.Category.map((item) => item.value),
        backgroundColor: this.Category.map((item) => item.color1), // Couleur des barres
        borderColor: this.Category.map((item) => item.color2), // Couleur des bordures des barres
        borderWidth: 1,
      },
    ],
  };

  options = {
    maintainAspectRatio: false, // Assure que le graphique peut être redimensionné
    responsive: true, // Permet au graphique de répondre aux changements de taille
    plugins: {
      legend: {
        labels: {
          color: '#000000', // Couleur du texte des labels
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#000000', // Couleur du texte des ticks de l'axe X
        },
        grid: {
          color: '#e1e1e1', // Couleur des lignes de la grille de l'axe X
        },
      },
      y: {
        ticks: {
          color: '#000000', // Couleur du texte des ticks de l'axe Y
        },
        grid: {
          color: '#e1e1e1', // Couleur des lignes de la grille de l'axe Y
        },
      },
    },
  };
}
