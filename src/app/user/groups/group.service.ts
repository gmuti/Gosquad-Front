import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Group } from './group.model';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private storage: Storage
  ) {}

  async createGroup(group: Group): Promise<void> {
    let userEmail: string | undefined;

    await new Promise<void>((resolve, reject) => {
      this.authService.user$.subscribe((user) => {
        if (user) {
          userEmail = user.email;
          resolve();
        } else {
          reject(new Error('Utilisateur non connecté'));
        }
      });
    });

    if (!userEmail) {
      throw new Error('Utilisateur non connecté');
    }

    const newGroup = {
      ...group,
      members: [userEmail],
    };

    const groupsCollection = collection(this.firestore, 'groups');
    await addDoc(groupsCollection, newGroup);
  }

  async addUserToGroupByEmail(groupId: string, email: string): Promise<void> {
    const usersCollection = collection(this.firestore, 'user');
    const q = query(usersCollection, where('email', '==', email));
    const userDocs = await getDocs(q);

    if (!userDocs.empty) {
      const groupRef = doc(this.firestore, `groups/${groupId}`);
      await updateDoc(groupRef, {
        members: arrayUnion(email),
      });
    } else {
      throw new Error('Utilisateur non trouvé');
    }
  }

  async removeUserFromGroup(groupId: string, email: string): Promise<void> {
    const groupRef = doc(this.firestore, `groups/${groupId}`);
    await updateDoc(groupRef, {
      members: arrayRemove(email),
    });
  }

  async updateGroupParameters(
    groupId: string,
    parameters: Partial<Group>
  ): Promise<void> {
    const groupRef = doc(this.firestore, `groups/${groupId}`);
    await updateDoc(groupRef, parameters);
  }

  getUserGroups(): Observable<Group[]> {
    return new Observable<Group[]>((observer) => {
      const subscription = this.authService.user$.subscribe({
        next: async (user) => {
          if (user && user.email) {
            const userEmail = user.email;
            const groupsCollection = collection(this.firestore, 'groups');
            const q = query(
              groupsCollection,
              where('members', 'array-contains', userEmail)
            );
            const unsubscribe = onSnapshot(q, (snapshot) => {
              const groups = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Group[];
              observer.next(groups);
            });
            return () => unsubscribe();
          } else {
            observer.next([]);
            observer.complete();
            return () => {};
          }
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });

      return () => subscription.unsubscribe();
    }).pipe(
      map((groups) =>
        groups.map((group) => ({
          ...group,
          members: group.members || [],
          activities: group.activities || [],
        }))
      )
    );
  }
  async uploadFile(
    groupId: string,
    fileType: 'documents' | 'tickets' | 'vaccination' | 'assurance',
    file: File
  ): Promise<string> {
    const filePath = `${groupId}/${fileType}/${file.name}`;
    const storageRef = ref(this.storage, filePath);

    try {
      // Téléversement du fichier
      const uploadResult = await uploadBytes(storageRef, file);
      // Obtenir l'URL de téléchargement
      const downloadURL = await getDownloadURL(uploadResult.ref);
      return downloadURL;
    } catch (error) {
      console.error('Erreur lors du téléversement du fichier', error);
      throw error;
    }
  }

  getFileUrl(
    groupId: string,
    fileType: 'documents' | 'tickets' | 'vaccination' | 'assurance',
    fileName: string
  ): Observable<string> {
    const filePath = `${groupId}/${fileType}/${fileName}`;
    const fileRef = ref(this.storage, filePath);

    return from(getDownloadURL(fileRef)).pipe(map((url) => url));
  }
}
