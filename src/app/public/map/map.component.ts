import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map, Marker, Popup, MapStyle, config } from '@maptiler/sdk';
import { environment } from '../../../firebase-config';

import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map', { static: false }) mapContainer!: ElementRef<HTMLElement>;
  private map: Map | undefined;
  private marker: Marker | undefined;
  private popup: Popup | undefined;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      config.apiKey = environment.mapTilerApiKey;

      const nantesCoordinates = { lat: 47.2184, lng: -1.5536 };
      const initialState = { ...nantesCoordinates, zoom: 14 };

      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        center: [initialState.lng, initialState.lat],
        zoom: initialState.zoom,
      });

      // Création du marqueur à la position de Nantes
      this.marker = new Marker({
        color: '#FF5733', // Couleur personnalisée du marqueur
        draggable: true, // Marqueur draggable
      })
        .setLngLat([nantesCoordinates.lng, nantesCoordinates.lat])
        .addTo(this.map); // Ajout du marqueur à la carte

      // Création et configuration de la popup
      this.popup = new Popup({
        closeButton: true, // Bouton de fermeture
        closeOnClick: true, // Fermeture au clic sur la carte
        maxWidth: '300px', // Largeur maximale de la popup
        className: 'custom-popup', // Classe CSS personnalisée pour la popup
      })
        .setHTML('<h1>Hello World!</h1>') // Contenu HTML de la popup
        .setLngLat([nantesCoordinates.lng, nantesCoordinates.lat]); // Position de la popup

      // Associer la popup au marqueur
      this.marker.setPopup(this.popup);

      // Ajouter le marqueur à la carte
      this.marker.addTo(this.map);
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
