import { ApplicationConfig } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideClientHydration } from '@angular/platform-browser';
import { firebaseConfig } from '../firebase-config';
import { routes } from './app.routes';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage, getStorage } from '@angular/fire/storage';

const router = RouterModule.forRoot(routes, {
  scrollPositionRestoration: 'enabled',
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
};
