import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Group } from '../group.model';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild } from '@angular/core';
import { EmojiModule, EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SafeHtmlPipe } from './safe-html.pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, EmojiModule, SafeHtmlPipe, PickerModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatComponent implements OnChanges, OnInit {
  @Input() selectedGroup: Group | null = null;
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  currentUser: string | null = null;

  userInfos: {
    id: string;
    displayName: string;
    email: string;
    photoUrl: string | null;
  }[] = [];
  messages: {
    senderId: string;
    message: string;
    timestamp: any;
    senderPhotoUrl: string | null;
    imageUrl?: string;
  }[] = [];
  newMessage: string = '';

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['selectedGroup'] && this.selectedGroup) {
      this.userInfos = [];
      for (const email of this.selectedGroup.members) {
        const userId = await this.authService.getUserIdByEmail(email);
        if (userId) {
          const userInfo = await this.authService.getUserById(userId);
          if (userInfo) {
            this.userInfos.push({
              id: userId,
              displayName: userInfo.displayName,
              email: userInfo.email,
              photoUrl: userInfo.photoUrl,
            });
          }
        }
      }
      this.chatService.setGroupId(this.selectedGroup.id!); // Assurez-vous que le groupe est bien défini
    }
  }

  async ngOnInit() {
    this.currentUser = await this.authService.getCurrentUserId();
    if (this.currentUser) {
      this.chatService.onMessage().subscribe((messages) => {
        this.messages = messages.map((msg) => ({
          ...msg,
          senderPhotoUrl:
            this.userInfos.find((user) => user.id === msg.senderId)?.photoUrl ||
            null,
        }));
      });
    } else {
      console.error('Current user ID could not be retrieved');
    }
  }

  async sendMessage() {
    if (this.newMessage.trim()) {
      const senderId = await this.authService.getCurrentUserId();
      if (senderId) {
        this.chatService.sendMessage(this.newMessage, senderId);
        this.newMessage = '';
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.chatService.uploadImage(file).then((imageUrl) => {
        const senderId = this.currentUser;
        if (senderId) {
          this.chatService.sendMessage(this.newMessage, senderId, imageUrl);
          this.newMessage = '';
        }
      });
    }
  }

  getUserDisplayName(userId: string): string {
    const user = this.userInfos.find((u) => u.id === userId);
    return user ? user.displayName : 'Unknown';
  }

  getUserPhotoUrl(userId: string): string | null {
    const user = this.userInfos.find((u) => u.id === userId);
    return user ? user.photoUrl : null;
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
