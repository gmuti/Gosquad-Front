import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  query,
  onSnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import { orderBy } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private url: string = 'http://localhost:3000'; // URL de votre serveur Socket.IO
  private messagesCollection: any;
  private messagesSubject = new Subject<any>();
  private currentGroupId: string | null = null;

  constructor(private firestore: Firestore, private storage: Storage) {
    this.socket = io(this.url);
  }

  setGroupId(groupId: string) {
    this.currentGroupId = groupId;
    this.messagesCollection = collection(
      this.firestore,
      `groups/${groupId}/messages`
    );
    this.listenToMessages();
  }

  private listenToMessages() {
    if (this.currentGroupId) {
      // Trier les messages par timestamp pour que les plus récents apparaissent en bas
      const q = query(this.messagesCollection, orderBy('timestamp', 'asc'));
      onSnapshot(q, (querySnapshot) => {
        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        this.messagesSubject.next(messages);
      });
    }
  }

  async uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  sendMessage(message: string, senderId: string, imageUrl?: string) {
    if (this.currentGroupId) {
      const messageData: any = {
        message,
        senderId,
        timestamp: new Date(),
      };
      if (imageUrl) {
        messageData.imageUrl = imageUrl;
      }
      addDoc(this.messagesCollection, messageData);
      this.socket.emit('send_message', {
        ...messageData,
        groupId: this.currentGroupId,
      });
    }
  }

  onMessage(): Observable<any[]> {
    return this.messagesSubject.asObservable();
  }
}
