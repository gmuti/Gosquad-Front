import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Map, Popup, MapStyle, config } from '@maptiler/sdk';
import { environment } from '../../../firebase-config';

@Component({
  selector: 'app-map',
  standalone: true, // Déclarez le composant comme standalone
  imports: [CommonModule], // Importez CommonModule
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLElement>;
  private map: Map | undefined;
  private popup: Popup | undefined;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      config.apiKey = environment.mapTilerApiKey; // Utilisation de votre clé API

      const nantesCoordinates = { lat: 47.2184, lng: -1.5536 }; // Coordonnées de Nantes
      const initialState = { ...nantesCoordinates, zoom: 14 };

      // Initialisation de la carte MapTiler
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      // Création et ajout d'une popup à la carte
      this.popup = new Popup({
        closeOnClick: true, // Fermer la popup lorsqu'on clique sur la carte
        maxWidth: '300px', // Largeur maximale de la popup
        className: 'custom-popup', // Classe CSS personnalisée pour la popup
      })
        .setLngLat([nantesCoordinates.lng, nantesCoordinates.lat])
        .setHTML(
          '<h1>Visite!</h1><p class="tt">44 Rue des Dervallières 44000 Nantes</p>'
        )
        .addTo(this.map);
    }
  }

  ngOnDestroy() {
    // Nettoyage de la carte à la destruction du composant
    this.map?.remove();
  }
}
