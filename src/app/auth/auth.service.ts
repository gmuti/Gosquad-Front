import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  onAuthStateChanged,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendPasswordResetEmail } from 'firebase/auth';
import {
  Firestore,
  doc,
  collection,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;
  private currentUser: User | null = null;

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    this.user$ = new Observable((observer) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const userDocRef = doc(this.firestore, `user/${user.uid}`);
          getDoc(userDocRef).then((docSnap) => {
            if (docSnap.exists()) {
              observer.next(docSnap.data());
            } else {
              observer.next(null);
            }
          });
        } else {
          observer.next(null);
        }
      });
    });

    this.auth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
  }

  signInWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signInWithGoogle() {
    const result = await signInWithPopup(this.auth, new GoogleAuthProvider());
    const user = result.user;
    if (user) {
      const userData = {
        displayName: user.displayName,
        email: user.email,
      };
      await this.updateUserData(user.uid, userData);
    }
  }

  signOut() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/public']);
    });
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async updateUserData(userId: string, userData: any) {
    const userDoc = doc(this.firestore, `user/${userId}`);
    await setDoc(userDoc, userData, { merge: true });
  }

  // Méthode pour récupérer l'ID utilisateur par email
  async getUserIdByEmail(email: string): Promise<string | null> {
    const userCollectionRef = collection(this.firestore, 'user');
    const q = query(userCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // Aucun utilisateur trouvé avec cet email
    }

    const userDoc = querySnapshot.docs[0]; // Supposons qu'il n'y a qu'un seul utilisateur avec cet email
    return userDoc.id; // Retourne l'ID du document
  }

  // Méthode pour récupérer le display name de l'utilisateur par son email
  async getDisplayNameByEmail(email: string): Promise<string | null> {
    const userCollectionRef = collection(this.firestore, 'user');
    const q = query(userCollectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null; // Aucun utilisateur trouvé avec cet email
    }

    const userDoc = querySnapshot.docs[0];
    return userDoc.data()['displayName'];
  }

  async getUserById(userId: string): Promise<any | null> {
    const userDocRef = doc(this.firestore, `user/${userId}`);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return docSnap.data(); // Retourne les données utilisateur
    } else {
      return null; // Aucun utilisateur trouvé avec cet ID
    }
  }

  async getCurrentUserId(): Promise<string | null> {
    if (this.currentUser) {
      return this.currentUser.uid;
    } else {
      return null;
    }
  }
}
